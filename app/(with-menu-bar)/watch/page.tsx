/*
 * @Author: err0r
 * @Date: 2023-10-20 01:26:09
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-30 19:26:08
 * @Description: 
 * @FilePath: \bee-channel-front\app\watch\page.tsx
 */
"use client";
import { useSearchParams } from 'next/navigation'
import { MediaList, PlayList } from '@/components/media/mediaAssembly';
import { Button, ButtonGroup, Skeleton, User } from '@nextui-org/react';
import { LikeIcon, MoreIcon, ShareIcon, UnlikeIcon } from '@/components/common/icons';
import { ChatComment, LiveChat } from '@/components/media/chatComment';
import { useEffect, useRef, useState } from 'react';
import { BriefArea } from '@/components/media/mediaAssembly';
import { MediaSourceType, MediaType } from '@/types/enum';
import { getModuleRecommend, getVideoInfo } from '@/api/media';
import { SimpleVideo, VideoOptions } from '@/types/media';
import { StoreFileHost } from '@/types';
import { VideoContainer } from '@/components/media/videoContainer';
import numberal from 'numeral';

export default function Page() {

	const searchParams = useSearchParams()
	const playerRef = useRef(null);
	const [curMedia, setCurMedia] = useState<SimpleVideo>()
	const [liveState, setLiveState] = useState<boolean>()
	const [videoOptions, setOptions] = useState<VideoOptions>({
		autoplay: false,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [],
		playbackRates: [0.5, 1, 1.5, 2],
		controlBar: {
			volumePanel: {
				inline: false
			}
		}
	})
	const [recommend, setRecommend] = useState<SimpleVideo[]>([])

	useEffect(() => {
		const type = searchParams.get('type')
		const id = searchParams.get('id')

		const fetchVideo = async () => {
			await getVideoInfo(id!).then((res) => {
				if (res) {
					setCurMedia(res.result)
					setOptions({
						...videoOptions,
						sources: [{
							src: `${StoreFileHost}${res.result.savePath}`,
							type: MediaSourceType.VIDEO
						}]
					})
				}
			})
		}

		//TODO get recommended video list
		const fetchData = async () => {
			await getModuleRecommend('1').then(res => {
				setRecommend(res?.result)
			})
		}
		fetchData()
		setLiveState(type === MediaType.LIVE)
		if (liveState) {
			// TODO live initiate
		} else {
			fetchVideo()
		}
	}, [])


	const handlePlayerReady = (player: any) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on('waiting', () => {
			console.log('player is waiting');
		});

		player.on('dispose', () => {
			console.log('player will dispose');
		});
	};

	return (
		<div className='flex flex-wrap px-4 md:px-12 gap-4'>
			<div className='flex-col min-w-[875px] flex-[2_1_0%]'>
				<div className='w-full rounded-lg overflow-hidden shadow-2xl dark:shadow-white-lg'>
					{
						curMedia?.savePath ?
							<VideoContainer options={videoOptions} onReady={handlePlayerReady} /> :
							<Skeleton className='w-full h-[500px]' />
					}
				</div>
				<div className='flex-col'>
					<p className='text-2xl mt-4 mb-1'>{curMedia?.title}</p>
					<div className='flex items-center mb-4'>
						<div className='flex items-center '>
							<User
								className="items-center"
								name={curMedia?.author.username || '施力TV'}
								classNames={{
									name: 'line-clamp-1'
								}}
								// TODO get integrite author message
								description={
									<div className='mt-1 line-clamp-1'>
										{numberal(curMedia?.author.subscribeCount).format("0a")} subscribers
									</div>
								}
								avatarProps={{
									className: 'flex-none w-[48px] h-[48px] mt-1 mr-1',
									src: `${StoreFileHost}${curMedia?.author.profile}`
								}}
							/>
							<Button
								onClick={() => { setLiveState(state => !state) }}
								radius='full'
								color="primary"
								className='ml-6'>
								{
									curMedia?.author.hasConcern ? 'Unsubscribe' : 'Subscribe'
								}
							</Button>
						</div>
						<div className='flex flex-1 items-center justify-end mr-4'>
							<ButtonGroup
								color="primary"
								radius='full'
								className='ml-6'>
								<Button><LikeIcon />{numberal(curMedia?.liked).format("0a")}</Button>
								<Button><UnlikeIcon /></Button>
							</ButtonGroup>
							<Button
								color="primary"
								radius='full'
								className='ml-4'>
								<ShareIcon />Share
							</Button>
							<Button
								color="primary"
								radius='full'
								className='ml-4'
								isIconOnly>
								<MoreIcon />
							</Button>
						</div>
					</div>
					<BriefArea content={curMedia?.introduction || ''} />
					<div>
						{!liveState && curMedia && <ChatComment media={curMedia} />}
					</div>
				</div>
			</div>
			{
				// hidden lg:inline-block
			}
			<div className='flex-[1_1_0%] px-8'>
				{/* TODO if into page by playlist， it will show */}
				{
					liveState ?
						<LiveChat /> :
						false && <PlayList className="mb-6" />
				}
				<MediaList mediaList={recommend} />
			</div>

		</div>
	);
}