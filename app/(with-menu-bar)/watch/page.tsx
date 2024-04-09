'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { MediaList } from '@/components/media/mediaAssembly';
import { Avatar, Skeleton } from '@nextui-org/react';
import { Button, ButtonGroup } from '@nextui-org/button';
import {
	AddCollectionIcon,
	LikeIcon,
	UnlikeIcon,
	WatchLaterIcon,
} from '@/components/common/icons';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/modal';
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from '@nextui-org/table';
import { ChatComment } from '@/components/media/chatComment';
import { LiveChat } from '@/components/media/liveChat';
import { Key, useCallback, useEffect, useRef, useState } from 'react';
import { BriefArea } from '@/components/media/mediaAssembly';
import {
	DeriveType,
	FavoriteType,
	MediaSourceType,
	MediaType,
} from '@/types/enum';
import {
	addToPlayList,
	favoriteAction,
	getPlayList,
	getVideoInfo,
	historyProcess,
} from '@/api/media';
import {
	SimpleMedia,
	MediaOptions,
	PlayList,
	PlayVideoList,
} from '@/types/media';
import { VideoContainer } from '@/components/media/videoContainer';
import numberal from 'numeral';
import { subscribeAction } from '@/api/user';
import { getAuthInfoLocal, isExist } from '@/utils/common/tokenUtils';
import { favoriteDataPackaging } from '@/utils/media';
import { LoginPopover } from '@/components/common/popover';
import { LiveContainer } from '@/components/media/liveContainer';
import { getLiveUserInfo } from '@/api/live';
import { useAppDispatch } from '@/store/hooks';
import { setRoomId, setUserId } from '@/store/slices/liveSlice';
import Player from 'video.js/dist/types/player';

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST;
const liveRoomHost = process.env.NEXT_PUBLIC_LIVE_ROOM_HOST;

export type ExtendPlayList = PlayList & { checked: boolean };

export default function Page() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const type = searchParams.get('type');
	const id = searchParams.get('id');
	const authInfo = getAuthInfoLocal();
	const playerRef = useRef<Player>();
	const historyRef = useRef<any>();
	const [curMedia, setCurMedia] = useState<SimpleMedia>();
	const [isLive, setLiveState] = useState<boolean>();
	const [isOpen, setOpenState] = useState<boolean>(false);
	const watchLaterId = useRef<string>('');
	const [playLists, setPlayLists] = useState<PlayList[]>([]);
	const [selection, setSelection] = useState<Iterable<Key>>([]);
	const [mediaOptions, setOptions] = useState<MediaOptions>({
		sources: [],
		title: '',
	});
	const [originSelectedIndex, setOriginSelectedIndex] = useState<
		Partial<PlayVideoList>[]
	>([]);
	const [collectionList, setCollectionList] = useState<ExtendPlayList[]>([]);

	const [mutableCollection, setMutableCollection] = useState<ExtendPlayList[]>(
		[],
	);

	let timeOut: NodeJS.Timeout;

	const unloadEvent = () => {
		if (historyRef.current.duration <= 0) {
			return;
		}
		historyProcess({
			videoId: historyRef.current.id,
			duration: historyRef.current.duration.toString(),
			pausePoint: playerRef.current?.currentTime()?.toString(),
		});
	};

	const goToUser = (userId: string) => {
		router.push(`/user/${userId}`);
	};

	const dispatch = useAppDispatch();
	dispatch(setRoomId(id || ''));
	dispatch(setUserId(authInfo?.information?.id || ''));

	const subscribeChange = async () => {
		if (!isExist()) {
			return;
		}
		await subscribeAction(curMedia?.author.id!).then(res => {
			if (res.result) {
				setCurMedia(pre => {
					return {
						...pre,
						author: {
							...pre?.author,
							subscribeCount: pre?.author.hasConcern
								? pre?.author.subscribeCount! - 1
								: pre?.author.subscribeCount! + 1,
							hasConcern: !pre?.author.hasConcern,
						},
					} as SimpleMedia;
				});
			}
		});
	};

	const favoriteChange = async (favoriteType: number) => {
		if (!isExist()) {
			return;
		}
		await favoriteAction({
			sourceId: curMedia?.id!,
			deriveType: DeriveType.VIDEO,
			favoriteType,
			userToId: curMedia?.authorId,
		}).then(res => {
			if (res.result) {
				setCurMedia(pre => {
					const result = favoriteDataPackaging(pre, favoriteType);
					return { ...result };
				});
			}
		});
	};

	const fetchPlayList = async () => {
		const { result } = await getPlayList();
		setPlayLists(result);
		setOriginSelectedIndex(result);
	};

	const fetchWatchLater = async () => {
		const { result } = await getPlayList(1);
		watchLaterId.current = result[0].id;
	};

	const handlePlayerReady = (player: Player) => {
		playerRef.current = player;

		player.on('playing', () => {
			timeOut = setInterval(() => {
				historyRef.current = {
					...historyRef.current,
					duration: historyRef.current.duration + 1,
				};
			}, 1000);
		});

		player.on('pause', () => {
			clearInterval(timeOut);
		});
	};

	const videoContainerBack = useCallback(() => {
		return mediaOptions.sources.length > 0 ? (
			isLive ? (
				<LiveContainer options={mediaOptions} />
			) : (
				<VideoContainer
					options={mediaOptions}
					onReady={handlePlayerReady}
				/>
			)
		) : (
			<Skeleton className='w-full h-[500px]' />
		);
	}, [mediaOptions]);

	const addVideoToPlayList = () => {
		const target = Array.from(selection).map(item => item.toString());
		addToPlayList(curMedia!.id, target);
		setOpenState(false);
	};

	const fetchVideo = async () => {
		await getVideoInfo(id!).then(res => {
			if (res && res.code === 200) {
				setCurMedia(res.result);
				setOptions({
					title: res.result.title,
					sources: [
						{
							src: `${StoreFileHost}${res.result.savePath}`,
							type: MediaSourceType.VIDEO,
						},
					],
				});
				historyRef.current = {
					id: res.result.id,
					duration: 0,
				};
				document.title = res.result.title;
			}
		});
	};

	const fetchLive = async () => {
		await getLiveUserInfo(id!).then(res => {
			if (res && res.code === 200) {
				setCurMedia(res.result);
				setOptions({
					title: res.result.title,
					sources: [
						{
							src: `${liveRoomHost}/${id}.flv`,
							type: MediaSourceType.HTTP_FLV,
						},
					],
				});
				document.title = res.result.title;
			}
		});
	};

	useEffect(() => {
		setLiveState(type === MediaType.LIVE);

		if (type === MediaType.LIVE) {
			fetchLive();
		} else {
			fetchVideo();
		}

		fetchWatchLater();
		window.addEventListener('beforeunload', unloadEvent);

		return () => {
			unloadEvent();
			playerRef.current?.dispose();
			window.removeEventListener('beforeunload', unloadEvent);
		};
	}, []);

	return (
		<>
			<div className='flex px-4 md:px-12 gap-7'>
				<div className='flex-col  flex-[2_1_0%]'>
					<div className='w-[900px] rounded-lg overflow-hidden shadow-2xl dark:shadow-white-lg'>
						{videoContainerBack()}
					</div>
					<div className='flex-col'>
						<p className='text-2xl mt-4 mb-1'>{curMedia?.title}</p>
						<div className='flex items-center mb-4'>
							<div className='flex items-center'>
								<Avatar
									onClick={() => {
										goToUser(curMedia?.author.id!);
									}}
									src={`${StoreFileHost}${curMedia?.author.profile}`}
									className='flex-none w-[48px] h-[48px] mt-1 mr-1 cursor-pointer'
								/>
								<div className='ml-1 flex flex-col justify-start items-start'>
									<p
										onClick={() => {
											goToUser(curMedia?.author.id!);
										}}
										className='line-clamp-1 cursor-pointer'>
										{curMedia?.author.username || 'No'}
									</p>
									<div className='line-clamp-1 text-sm text-default-500'>
										{numberal(curMedia?.author.subscribeCount).format('0a')}{' '}
										subscribers
									</div>
								</div>
								<LoginPopover>
									<Button
										onClick={() => {
											subscribeChange();
										}}
										radius='full'
										color='primary'
										className='ml-6'>
										{curMedia?.author.hasConcern ? 'Unsubscribe' : 'Subscribe'}
									</Button>
								</LoginPopover>
							</div>
							{!isLive && (
								<div className='flex flex-1 items-center justify-end'>
									<ButtonGroup color='primary'>
										<LoginPopover>
											<Button
												onClick={() => {
													favoriteChange(FavoriteType.LIKE);
												}}>
												<LikeIcon
													fill={
														curMedia?.favoriteType === FavoriteType.LIKE
															? '#8c51c9'
															: undefined
													}
												/>
												{numberal(curMedia?.likeCount).format('0a')}
											</Button>
										</LoginPopover>
										<LoginPopover>
											<Button
												onClick={() => {
													favoriteChange(FavoriteType.UNLIKE);
												}}>
												<UnlikeIcon
													fill={
														curMedia?.favoriteType === FavoriteType.UNLIKE
															? '#8c51c9'
															: undefined
													}
												/>
											</Button>
										</LoginPopover>
									</ButtonGroup>
									<Button
										isIconOnly
										color='primary'
										radius='full'
										className='ml-4'
										onClick={() => {
											fetchPlayList();
											setOpenState(true);
										}}>
										<AddCollectionIcon />
									</Button>
									<Button
										isIconOnly
										color='primary'
										radius='full'
										className='ml-4'
										onClick={() => {
											addToPlayList(curMedia!.id, [watchLaterId.current]);
										}}>
										<WatchLaterIcon />
									</Button>
								</div>
							)}
						</div>
						<BriefArea content={curMedia?.introduction || ''} />
						<div>{!isLive && curMedia && <ChatComment media={curMedia} />}</div>
					</div>
				</div>
				<div className='flex-1'>
					{type === MediaType.LIVE ? <LiveChat /> : <MediaList id={'1'} />}
				</div>
			</div>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setOpenState(false);
				}}
				className='w-[300px] max-h-[70%] overflow-y-auto'>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader>Add To PlayList</ModalHeader>
							<ModalBody>
								<Table
									selectionMode='multiple'
									selectedKeys={selection}
									onSelectionChange={setSelection}
									aria-label='Add To PlayList'
									hideHeader>
									<TableHeader>
										<TableColumn>NAME</TableColumn>
									</TableHeader>
									<TableBody>
										{playLists.map(item => (
											<TableRow key={item.id}>
												<TableCell>{item.name}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={onClose}>
									Cancel
								</Button>
								<Button
									color='primary'
									onPress={addVideoToPlayList}>
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
