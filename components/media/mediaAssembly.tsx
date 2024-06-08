'use client'
import clsx from 'clsx'
import qs from 'qs'
import { Image } from '@nextui-org/image'
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	User,
	Button,
	Chip,
	Avatar,
	Pagination,
} from '@nextui-org/react'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { ClassValue } from 'tailwind-variants'
import { Category, HistoryVideo, SimpleMedia } from '@/types/media'
import InfiniteScroll from 'react-infinite-scroller'
import {
	getHistoryVideoPage,
	getLikedVideoPage,
	getModuleRecommend,
	getRecommendByUser,
	getWatchLaterVideoPage,
} from '@/api/media'
import { calculateDuration, pushLive, pushVideo } from '@/utils/common/memoFun'

import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { ModuleCategory } from '@/types/enum'
import numberal from 'numeral'
import { PageParams, SimpleParams, TimePoint } from '@/types'
import {
	FavoriteIcon,
	HistoryIcon,
	LaterIcon,
	RemoveIcon,
} from '../common/icons'
import { useTheme } from 'next-themes'
import { ActiveLiveInfo } from '@/types/live'
import { getActiveLivePage } from '@/api/live'

const goToUser = (userId: string, router: AppRouterInstance) => {
	router.push(`/user/${userId}`)
}
const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST

const MediaCard = (props: {
	video: SimpleMedia
	removeFromPlayList?: (videoId: string) => void
}) => {
	const fromNow = useMemo(() => {
		return calculateDuration(props.video.publicTime)
	}, [props.video])
	const router = useRouter()

	return (
		<>
			<Card
				isPressable
				onPress={(e) => {
					pushVideo(props.video.id, router)
				}}
				className='border-none bg-background/60 dark:bg-default-100/50 items-start cursor-pointer h-fit'
				shadow='sm'>
				<Image
					shadow='sm'
					radius='lg'
					className='object-cover max-h-[180px] w-full'
					removeWrapper
					src={StoreFileHost + props.video.coverPath}
					alt='NextUI Album Cover'
				/>
				<CardFooter className='text-small flex-grow items-start flex flex-col'>
					<div className='flex items-start gap-4'>
						<Avatar
							onClick={() => {
								goToUser(props.video.authorId, router)
							}}
							className='flex-none w-[32px] h-[32px] mt-1'
							src={StoreFileHost + props.video.author.profile}
						/>
						<div className='flex flex-col justify-start text-start gap-1'>
							<p className='line-clamp-1'>{props.video.title}</p>
							<div className='text-default-400 text-xs'>
								<p className='line-clamp-1'>{props.video.author.username}</p>
								<p className='line-clamp-1'>
									{props.video.clickedCount} views · {fromNow}
								</p>
							</div>
						</div>
					</div>
					{props.removeFromPlayList && (
						<div className='w-full flex items-center justify-between text-default-400'>
							<p>Action</p>
							<Button
								isIconOnly
								size='sm'
								variant='light'
								onClick={() => {
									props.removeFromPlayList!(props.video.id)
								}}>
								<RemoveIcon />
							</Button>
						</div>
					)}
				</CardFooter>
			</Card>
		</>
	)
}

const SimpleMediaCard = (props: { video: SimpleMedia }) => {
	const fromNow = useMemo(() => {
		return calculateDuration(props.video.publicTime)
	}, [props.video])
	const router = useRouter()

	return (
		<>
			<Card
				isPressable
				onPress={(e) => {
					pushVideo(props.video.id, router)
				}}
				isBlurred
				className='border-none bg-background/60 dark:bg-default-100/50 items-start cursor-pointer'
				shadow='sm'>
				<Image
					isBlurred
					shadow='sm'
					radius='lg'
					className='w-full object-cover'
					src={StoreFileHost + props.video.coverPath}
					alt='NextUI Album Cover'
				/>
				<CardFooter className='text-small flex-grow items-start'>
					<div className='flex items-start gap-4'>
						<div className='flex flex-col justify-start text-start gap-1'>
							<p className='line-clamp-1'>{props.video.title}</p>
							<div className='text-default-400 text-xs'>
								<p className='line-clamp-1'>
									{props.video.clickedCount} views · {fromNow}
								</p>
							</div>
						</div>
					</div>
				</CardFooter>
			</Card>
		</>
	)
}

export const TitleTemplate = (props: { icon?: ReactNode; title: string }) => {
	return (
		<div className='flex'>
			{props.icon}
			<h1 className='text-xl mb-4 ml-2'>{props.title}</h1>
		</div>
	)
}

export const SimpleMediaModule = (props: { videoList: SimpleMedia[] }) => {
	return (
		<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
			{props.videoList.map((item) => (
				<SimpleMediaCard
					key={item.id}
					video={item}></SimpleMediaCard>
			))}
		</div>
	)
}

export const MediaCardGrid = (props: {
	mediaList: SimpleMedia[]
	removeFromPlayList?: (videoId: string) => void
	grid?: string
	gap?: string
}) => {
	return (
		<div
			className={clsx(
				'grid',
				props.grid || 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ',
				props.gap || 'gap-4',
			)}>
			{props.mediaList.map((item) => (
				<MediaCard
					key={item.id}
					removeFromPlayList={props.removeFromPlayList}
					video={item}></MediaCard>
			))}
		</div>
	)
}

export const ChipModule = (props: { chipList: any[] }) => {
	return (
		<div className='flex gap-4'>
			{props.chipList.map((item, index) => (
				<Chip
					key={item.id}
					className='h-8'
					classNames={{
						content: 'w-20 text-base/7 flex justify-center h-full',
					}}
					color='primary'
					radius='sm'>
					{item.name}
				</Chip>
			))}
		</div>
	)
}

export const MediaCardModule = (props: {
	module?: Category
	isList?: boolean
	slot?: (fetch: () => Promise<void>) => ReactNode
	grid?: string
	gap?: string
	data?: SimpleMedia[]
	recommend?: boolean
}) => {
	const router = useRouter()
	const [videList, setVideoList] = useState<SimpleMedia[]>(props.data || [])
	const fetchData = async () => {
		if (props.recommend) {
			await getRecommendByUser().then((res) => {
				setVideoList(res.result)
			})
			return
		}

		if (props.module?.id === ModuleCategory.HISTORY) {
			await getHistoryVideoPage(new PageParams(1, 8))?.then((res) => {
				if (!res) {
					return
				}
				const data: SimpleMedia[] = []
				res.result.data.forEach((item: HistoryVideo) => {
					data.push(item.video)
				})
				setVideoList(data)
			})
		} else if (props.module?.id === ModuleCategory.WATCH_LATER) {
			await getWatchLaterVideoPage(new PageParams(1, 8))?.then((res) => {
				if (!res) {
					return
				}
				setVideoList(res.result.data)
			})
		} else if (props.module?.id === ModuleCategory.LIKED) {
			await getLikedVideoPage(new PageParams(1, 8))?.then((res) => {
				if (!res) {
					return
				}
				setVideoList(res.result.data)
			})
		} else {
			await getModuleRecommend(
				props.module?.id || '',
				new PageParams(1, 8),
			).then((res) => {
				setVideoList(res.result)
			})
		}
	}
	const onMorePress = () => {
		router.push(`search?${qs.stringify({ categoryId: props.module?.id })}`)
	}

	useEffect(() => {
		if (props.data) {
			return
		}
		fetchData()
	}, [])

	return (
		<div className='mb-10'>
			<div className='flex justify-between'>
				{(props.slot && props.slot(fetchData)) || (
					<>
						<h1 className='text-xl mb-4'>
							{props.recommend ? 'Recommend' : props.module?.name}
						</h1>
						<Button
							onPress={onMorePress}
							radius='full'
							variant='shadow'
							color='primary'
							size='sm'>
							More
						</Button>
					</>
				)}
			</div>
			{videList.length > 0 ? (
				!props.isList ? (
					<MediaCardGrid
						mediaList={videList}
						grid={props.grid}
						gap={props.gap}
					/>
				) : (
					<MediaScrollList mediaList={videList} />
				)
			) : (
				<EmptyData />
			)}
		</div>
	)
}

const MediaCommonItem = (props: {
	information: SimpleMedia
	className?: ClassValue
	imageSize?: string
	fontSize?: string
	disableDescription?: boolean
}) => {
	const router = useRouter()

	const imageClass = clsx(
		'object-cover',
		props.imageSize || 'h-[160px] w-[250px]',
	)

	return (
		<div
			onClick={() => {
				pushVideo(props.information.id, router)
			}}
			className={clsx(
				'w-full gap-4 flex mt-0 mb-3 cursor-pointer',
				props.className,
			)}>
			<div className='flex-none'>
				<Image
					shadow='sm'
					radius='lg'
					className={imageClass}
					src={`${StoreFileHost}${props.information.coverPath}`}
					alt='NextUI Album Cover'
				/>
			</div>
			<div className='line-clamp-2'>
				<p className={`line-clamp-2 ${props.fontSize || 'text-lg'}`}>
					{props.information?.title}
				</p>
				<p className='text-small text-foreground-400 mb-2 line-clamp-2'>
					{props.information.author.username} ·
					{numberal(props.information.clickedCount).format('0a')} views ·
					{calculateDuration(props.information.publicTime)}
				</p>
				{props.disableDescription && (
					<p className='text-small text-foreground-400 line-clamp-2'>
						{props.information.introduction}
					</p>
				)}
			</div>
		</div>
	)
}

const MediaListItem = (props: { content: SimpleMedia }) => {
	const router = useRouter()

	return (
		<>
			<Card
				isBlurred
				className='w-full border-none bg-background/60 dark:bg-default-100/50 mb-6'
				shadow='sm'>
				<CardHeader>
					<User
						className='cursor-pointer'
						onClick={() => {
							router.push(`/user/${props.content.authorId}`)
						}}
						name={props.content.author.username}
						avatarProps={{
							className: 'flex-none w-[32px] h-[32px] mr-1',
							src: `${StoreFileHost}${props.content.author.profile}`,
						}}
					/>
				</CardHeader>
				<CardBody
					className='overflow-hidden px-3 pb-3 pt-0 cursor-pointer'
					onClick={() => {
						pushVideo(props.content.id, router)
					}}>
					<MediaCommonItem information={props.content} />
				</CardBody>
			</Card>
		</>
	)
}

export const MediaList = (props: { data: SimpleMedia[] }) => {
	return (
		<div className='mx-3 flex-col min-w-[350px]'>
			{props.data.map((item, index) => (
				<MediaCommonItem
					key={item.id}
					information={item}
					imageSize='h-[110px] w-[180px]'
					fontSize='text-sm'
				/>
			))}
		</div>
	)
}

export const MediaScrollList = (props: {
	mediaList: any[]
	pageProcess?: any
	pointList?: TimePoint[]
	isHistory?: boolean
}) => {
	const TimeLine = useCallback(
		(index: number) => {
			const target = props.pointList?.find((item) => item.index === index)
			return target ? <TitleTemplate title={target.point} /> : <></>
		},
		[props.pointList],
	)

	return (
		<InfiniteScroll
			className='w-full'
			loadMore={() => {
				props.pageProcess.loadMore()
			}}
			hasMore={
				props.pageProcess.allPageParams.pageNo *
					props.pageProcess.allPageParams.pageParams.pageSize <=
				props.pageProcess.allPageParams.pageParams.total
			}>
			{props.mediaList.map((item, index) => (
				<>
					{TimeLine(index)}
					<MediaListItem
						key={index}
						content={props.isHistory ? item.video : item}
					/>
				</>
			))}
			{props.mediaList.length <= 0 && <EmptyData />}
		</InfiniteScroll>
	)
}

export const PlayList = (props: { className?: ClassValue }) => {
	const [recommend, setRecommend] = useState<SimpleMedia[]>([])
	const fetchData = async () => {
		await getModuleRecommend('1', new PageParams(1, 8)).then((res) => {
			setRecommend(res?.result)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div
			className={clsx(props.className, 'mb-4 rounded-xl dark:shadow-white-lg')}>
			<Card className=''>
				<CardHeader className='flex gap-3 px-4'>
					<div className='flex flex-col'>
						<p className='text-xl ml-2 mb-2'>Title</p>
						<div className='flex items-center gap-4'>
							<Chip
								color='primary'
								radius='sm'>
								Chip
							</Chip>
							<p className='text-small text-default-500'>Author</p>
							<p className='text-small text-default-500'>20 videos</p>
						</div>
					</div>
				</CardHeader>
				<CardBody className='py-1 px-5 max-h-[400px] scrollbar'>
					{recommend.map((item, index) => (
						<MediaCommonItem
							key={index}
							information={item}
							className={clsx('px-2 py-2 rounded-lg', {
								'bg-default-200 shadow': index === 1,
							})}
							imageSize='h-[80px] w-[150px]'
							fontSize='text-sm'
						/>
					))}
				</CardBody>
			</Card>
		</div>
	)
}

export const BriefArea = (props: {
	className?: ClassValue
	bodyClassName?: ClassValue
	content: string
}) => {
	const [briefExpand, setBriefExpand] = useState(false)
	const briefClass = clsx({
		'line-clamp-2': !briefExpand,
	})

	return (
		<Card
			shadow='sm'
			isPressable
			className={clsx(
				'mb-10 bg-[#f2f2f2] dark:bg-[#3F3F46] w-full',
				props.className,
			)}
			classNames={{
				base: 'border-none',
			}}
			onPress={() => setBriefExpand(!briefExpand)}>
			<CardBody className={clsx(props.bodyClassName)}>
				<p className={briefClass}>{props.content}</p>
			</CardBody>
		</Card>
	)
}

export const LibraryPage = () => {
	const router = useRouter()
	const moduleMap = [
		{
			icon: <HistoryIcon />,
			module: {
				id: ModuleCategory.HISTORY,
				name: 'History',
			},
			onMorePress: () => {
				router.push('/history')
			},
		},
		{
			icon: <LaterIcon />,
			module: {
				id: ModuleCategory.WATCH_LATER,
				name: 'Watch Later',
			},
			onMorePress: () => {
				router.push('/later')
			},
		},
		{
			icon: <FavoriteIcon />,
			module: {
				id: ModuleCategory.LIKED,
				name: 'Liked',
			},
			onMorePress: () => {},
		},
	]
	return (
		<>
			{moduleMap.map((item) => (
				<MediaCardModule
					key={item.module.id}
					module={item.module}
					grid='grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
					slot={(fetch) => {
						return (
							<>
								<TitleTemplate
									title={item.module.name}
									icon={item.icon}
								/>
								{item.module.id !== ModuleCategory.LIKED && (
									<Button
										onPress={item.onMorePress}
										radius='full'
										variant='shadow'
										color='primary'
										size='sm'>
										More
									</Button>
								)}
							</>
						)
					}}
				/>
			))}
		</>
	)
}

export const EmptyData = () => {
	const { theme } = useTheme()
	const [themeMode, setThemeMode] = useState('light')

	useEffect(() => {
		setThemeMode(theme || 'light')
	}, [theme])

	return (
		<div className='h-full flex-1 flex-col flex items-center justify-center'>
			<Image
				width={150}
				alt='Empty Data'
				src={`/empty_data_${themeMode}.png`}
			/>
			<h1 className='text-2xl'>No data</h1>
			<h2 className='text-zinc-300'>No data, Please try again later</h2>
		</div>
	)
}

export const LivePage = () => {
	const router = useRouter()

	const [liveList, setLiveList] = useState<ActiveLiveInfo[]>([])
	const [pageParams, setPageParams] = useState<SimpleParams>({
		pageSize: 20,
		total: 0,
	})
	const [pageNo, setPageNo] = useState<number>(1)

	const fetchData = async () => {
		const { result } = await getActiveLivePage({
			pageNo,
			pageSize: pageParams.pageSize,
		})

		setLiveList(result.data)
		setPageParams((pre) => ({ ...pre, total: result.total }))
	}

	useEffect(() => {
		fetchData()
	}, [pageNo])

	return (
		<div className='flex h-full flex-col justify-between'>
			<div
				className={clsx(
					'grid',
					'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ',
					'gap-4',
				)}>
				{liveList.map((item) => (
					<Card
						key={item.id}
						isPressable
						onPress={() => {
							pushLive(item.id, router)
						}}
						className='border-none bg-background/60 dark:bg-default-100/50 items-start cursor-pointer h-fit'
						shadow='sm'>
						<Image
							shadow='sm'
							radius='lg'
							className='object-cover max-h-[180px] w-full'
							removeWrapper
							src={StoreFileHost + item.cover}
							alt='NextUI Album Cover'
						/>
						<CardFooter className='text-small flex-grow items-start flex flex-col'>
							<div className='flex items-start gap-4'>
								<Avatar
									onClick={() => {
										goToUser(item.userId, router)
									}}
									className='flex-none w-[32px] h-[32px] mt-1'
									src={StoreFileHost + item.profile}
								/>
								<div className='flex flex-col justify-start text-start gap-1'>
									<p className='line-clamp-1'>{item.title}</p>
									<div className='text-default-400 text-xs'>
										<p className='line-clamp-1'>{item.username}</p>
									</div>
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
			{liveList.length > 0 ? (
				<Pagination
					className='w-full flex justify-center mt'
					classNames={{
						cursor: 'shadow-md opacity-100 ',
					}}
					page={pageNo}
					total={Math.ceil(pageParams.total / pageParams.pageSize)}
					onChange={setPageNo}
					initialPage={1}
				/>
			) : (
				<EmptyData />
			)}
		</div>
	)
}
