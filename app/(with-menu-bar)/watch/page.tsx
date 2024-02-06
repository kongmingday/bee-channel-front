"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { MediaList, PlayList } from '@/components/media/mediaAssembly';
import { Avatar, Button, ButtonGroup, Skeleton } from '@nextui-org/react';
import { LikeIcon, MoreIcon, ShareIcon, UnlikeIcon } from '@/components/common/icons';
import { ChatComment } from '@/components/media/chatComment';
import { LiveChat } from '@/components/media/liveChat'
import { useEffect, useRef, useState } from 'react';
import { BriefArea } from '@/components/media/mediaAssembly';
import { DeriveType, FavoriteType, MediaSourceType, MediaType } from '@/types/enum';
import { favoriteAction, getModuleRecommend, getVideoInfo } from '@/api/media';
import { SimpleMedia, MediaOptions } from '@/types/media';
import { VideoContainer } from '@/components/media/videoContainer';
import numberal from 'numeral';
import { subscribeActoin } from '@/api/user';
import { getAuthInfo, getAuthInfoLocal, isExist } from '@/utils/common/tokenUtils';
import { favoriteDataPackaging } from '@/utils/media';
import { LoginPopover } from '@/components/common/popover';
import { LiveContainer } from '@/components/media/liveContainer';
import { getLiveUserInfo } from '@/api/live';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRoomId, setUserId } from '@/store/slices/liveSlice';

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST
const liveRoomHost = process.env.NEXT_PUBLIC_LIVE_ROOM_HOST

export default function Page() {

	const router = useRouter()
	const searchParams = useSearchParams()
	const type = searchParams.get('type')
	const id = searchParams.get('id')
	const playerRef = useRef(null);
	const authInfo = getAuthInfoLocal()
	const [curMedia, setCurMedia] = useState<SimpleMedia>()
	const [isLive, setLiveState] = useState<boolean>()
	const [mediaOptions, setOptions] = useState<MediaOptions>({
		sources: [],
		title: ''
	})
	const goToUser = (userId: string) => { router.push(`/user/${userId}`) }

	const dispatch = useAppDispatch()
	dispatch(setRoomId(id || ''))
	dispatch(setUserId(authInfo?.information?.id || ''))

	const subscribeChange = async () => {
		if (!isExist()) {
			return;
		}
		await subscribeActoin(curMedia?.author.id!).then(res => {
			if (res.result) {
				setCurMedia(pre => {
					return {
						...pre,
						author: {
							...pre?.author,
							subscribeCount: pre?.author.hasConcern ?
								pre?.author.subscribeCount! - 1 : pre?.author.subscribeCount! + 1,
							hasConcern: !pre?.author.hasConcern
						}
					} as SimpleMedia
				})
			}
		})
	}

	const favoriteChange = async (favoriteType: number) => {
		if (!isExist()) {
			return;
		}
		await favoriteAction({
			sourceId: curMedia?.id!,
			deriveType: DeriveType.VIDEO,
			favoriteType,
			userToId: curMedia?.authorId
		}).then(res => {
			if (res.result) {
				setCurMedia(pre => {
					const result = favoriteDataPackaging(pre, favoriteType)
					return { ...result };
				})
			}
		})
	}


	const handlerPlayerReady = (player: any) => {
		playerRef.current = player;
		player.on('waiting', () => {
			console.log('player is waiting');
		});

		player.on('dispose', () => {
			console.log('player will dispose');
		});
	};

	useEffect(() => {
		setLiveState(type === MediaType.LIVE)

		const fetchVideo = async () => {
			await getVideoInfo(id!).then((res) => {
				if (res && res.code === 200) {
					setCurMedia(res.result)
					setOptions({
						title: res.result.title,
						sources: [{
							src: `${StoreFileHost}${res.result.savePath}`,
							type: MediaSourceType.VIDEO
						}]
					})
					document.title = res.result.title
				}
			})
		}

		const fetchLive = async () => {
			await getLiveUserInfo(id!).then((res) => {
				if (res && res.code === 200) {
					setCurMedia(res.result)
					setOptions({
						title: res.result.title,
						sources: [{
							src: `${liveRoomHost}/${id}.flv`,
							type: MediaSourceType.HTTP_FLV
						}]
					})
					document.title = res.result.title
				}
			})
		}

		if (type === MediaType.LIVE) {
			fetchLive()
		} else {
			fetchVideo()
		}
	}, [])

	return (
		<div className='flex px-4 md:px-12 gap-7'>
			<div className='flex-col  flex-[2_1_0%]'>
				<div className='w-[900px] rounded-lg overflow-hidden shadow-2xl dark:shadow-white-lg'>
					{
						mediaOptions.sources.length > 0 ?
							isLive ?
								<LiveContainer options={mediaOptions} />
								:
								<VideoContainer options={mediaOptions} onReady={handlerPlayerReady} />
							:
							<Skeleton className='w-full h-[500px]' />
					}
				</div>
				<div className='flex-col'>
					<p className='text-2xl mt-4 mb-1'>{curMedia?.title}</p>
					<div className='flex items-center mb-4'>
						<div className='flex items-center'>
							<Avatar
								onClick={() => { goToUser(curMedia?.author.id!) }}
								src={`${StoreFileHost}${curMedia?.author.profile}`}
								className='flex-none w-[48px] h-[48px] mt-1 mr-1 cursor-pointer' />
							<div className='ml-1 flex flex-col justify-start items-start'>
								<p
									onClick={() => { goToUser(curMedia?.author.id!) }}
									className='line-clamp-1 cursor-pointer'>
									{curMedia?.author.username || 'No'}
								</p>
								<div className='line-clamp-1 text-sm text-default-500'>
									{numberal(curMedia?.author.subscribeCount).format("0a")} subscribers
								</div>
							</div>
							<LoginPopover>
								<Button
									onClick={() => { subscribeChange() }}
									radius='full'
									color="primary"
									className='ml-6'>
									{
										curMedia?.author.hasConcern ? 'Unsubscribe' : 'Subscribe'
									}
								</Button>
							</LoginPopover>
						</div>
						<div className='flex flex-1 items-center justify-end'>
							{
								!isLive &&
								<ButtonGroup
									color="primary"
									radius='full'
									className='ml-6'>
									<LoginPopover>
										<Button onClick={() => { favoriteChange(FavoriteType.LIKE) }}>
											<LikeIcon fill={curMedia?.favoriteType === FavoriteType.LIKE ? '#8c51c9' : undefined} />
											{numberal(curMedia?.likeCount).format("0a")}
										</Button>
									</LoginPopover>
									<LoginPopover>
										<Button onClick={() => { favoriteChange(FavoriteType.UNLIKE) }}>
											<UnlikeIcon fill={curMedia?.favoriteType === FavoriteType.UNLIKE ? '#8c51c9' : undefined} />
										</Button>
									</LoginPopover>
								</ButtonGroup>
							}
							<Button
								color="primary"
								radius='full'
								className='ml-4'>
								<ShareIcon />Share
							</Button>
							<Button
								isIconOnly
								color="primary"
								radius='full'
								className='ml-4'>
								<MoreIcon />
							</Button>
						</div>
					</div>
					<BriefArea content={curMedia?.introduction || ''} />
					<div>
						{!isLive && curMedia && <ChatComment media={curMedia} />}
					</div>
				</div>
			</div>
			<div className='flex-1'>
				{
					type === MediaType.LIVE ? <LiveChat /> : <MediaList id={"1"} />
				}
			</div>

		</div>
	);
}