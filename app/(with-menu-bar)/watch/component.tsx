export const WatchPage = () => {
  const router = useRouter()
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
	const goToUser = (userId: string) => { router.push(`/user/${userId}`) }


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
					} as SimpleVideo
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

	return (
		<div className='flex flex-wrap px-4 md:px-12 gap-4'>
			<div className='flex-col min-w-[875px] flex-[2_1_0%]'>
				<div className='w-full rounded-lg overflow-hidden shadow-2xl dark:shadow-white-lg'>
					{
						curMedia?.savePath ?
							<VideoContainer options={videoOptions} onReady={handlerPlayerReady} /> :
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
							<Button
								color="primary"
								radius='full'
								className='ml-4'>
								<ShareIcon />Share
							</Button>
							{/* <Button
								isIconOnly
								color="primary"
								radius='full'
								className='ml-4'>
								<MoreIcon />
							</Button> */}
						</div>
					</div>
					<BriefArea content={curMedia?.introduction || ''} />
					<div>
						{!liveState && curMedia && <ChatComment media={curMedia} />}
					</div>
				</div>
			</div>
			<div className='flex-[1_1_0%] px-8'>
				{/* { TODO the video collection
					<PlayList />
				} */}
				{
					liveState ? <LiveChat /> : <MediaList id={"1"} />
				}
			</div>

		</div>
	);
}