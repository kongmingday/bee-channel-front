'use client'
import {
	Card,
	Listbox,
	ListboxItem,
	Image,
	Button,
	CardBody,
} from '@nextui-org/react'
import {
	deleteFromPlayList,
	getPlayList,
	getVideoByPlayListId,
} from '@/api/media'
import { RemoveIcon } from '@/components/common/icons'
import { SimpleParams } from '@/types'
import { SimpleMedia } from '@/types/media'
import numberal from 'numeral'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { calculateDuration, pushVideo } from '@/utils/common/memoFun'
import { useRouter } from 'next/navigation'
import { isExist } from '@/utils/common/tokenUtils'

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST

export default function Page() {
	const [pageParams, setPageParams] = useState<SimpleParams>({
		pageSize: 6,
		total: 0,
	})
	const [pageNo, setPageNo] = useState<number>(1)
	const [mediaList, setMediaList] = useState<SimpleMedia[]>([])
	const watchLaterId = useRef<string>('')
	const router = useRouter()

	const fetchPlayList = async () => {
		await getPlayList(1)?.then((response) => {
			if (response) {
				const { result } = response
				watchLaterId.current = result[0].id
			}
		})
	}

	const fetchPlayListVideo = async () => {
		await getVideoByPlayListId(watchLaterId.current)?.then((response) => {
			if (!response) {
				return
			}
			const { result } = response
			setMediaList((pre) => [...pre, ...result.data])
			setPageParams((pre) => ({ ...pre, total: result.total }))
			setPageNo((pre) => pre + 1)
		})
	}

	const removeFromPlayList = async (videoId: string) => {
		const { result } = await deleteFromPlayList(watchLaterId.current, videoId)
		setMediaList([])
		setPageParams({
			pageSize: 6,
			total: 0,
		})
		setPageNo(1)
		result && fetchPlayListVideo()
	}

	useEffect(() => {
		fetchPlayList().then(() => {
			fetchPlayListVideo()
		})
	}, [])

	return (
		<div className='flex h-full max-h-[640px] w-full flex-col lg:flex-row '>
			{mediaList.length > 0 && (
				<div className='w-full lg:fixed lg:w-[20%] min-w-[350px] lg:h-full'>
					<Card
						isBlurred
						className='items-center border-none w-full lg:h-full'
						shadow='none'>
						<Image
							removeWrapper
							alt='Album cover'
							className='object-cover absolute blur-3xl lg:h-[80%] w-full'
							shadow='none'
							src={StoreFileHost + mediaList[0].coverPath}
						/>
						<CardBody className='w-full flex-row lg:flex-col flex-wrap p-6 z-10'>
							<Image
								removeWrapper
								alt='Album cover'
								className='justify-self-center flex-none object-cover h-44 w-80 lg:w-full mr-5 lg:mr-0'
								shadow='sm'
								src={StoreFileHost + mediaList[0].coverPath}
							/>
							<div className='mx-2'>
								<h1 className='text-2xl mt-3 mb-2'>{mediaList[0].title}</h1>
								<p className='text-small line-clamp-2'>
									{mediaList[0].author.username} ·
									{' ' + numberal(mediaList[0].clickedCount).format('0a')}
									views ·{' ' + calculateDuration(mediaList[0].publicTime)}
								</p>
							</div>
						</CardBody>
					</Card>
				</div>
			)}
			<InfiniteScroll
				loadMore={() => {
					fetchPlayListVideo()
				}}
				hasMore={pageNo * pageParams.pageSize <= pageParams.total}>
				<Listbox className='w-full lg:w-[70%] lg:ml-[360px]'>
					{mediaList.map((item) => (
						<ListboxItem
							onClick={() => {
								pushVideo(item.id, router)
							}}
							key={item.id}
							className='h-28 mb-2 p-2'
							startContent={
								<div className='w-full h-full flex justify-between items-center'>
									<div className='flex h-full'>
										<Image
											removeWrapper
											alt='Album cover'
											className='flex-none object-cover w-[11rem] h-full mr-5'
											shadow='none'
											src={StoreFileHost + item.coverPath}
										/>
										<div>
											<p className='text-md line-clamp-2 mb-2'>{item.title}</p>
											<p className='text-small text-foreground-400 line-clamp-2'>
												{item.author.username} ·
												{' ' + numberal(item.clickedCount).format('0a')}
												views ·{' ' + calculateDuration(item.publicTime)}
											</p>
										</div>
									</div>
									<Button
										variant='light'
										className='items-center'
										isIconOnly
										onClick={() => {
											removeFromPlayList(item.id)
										}}>
										<RemoveIcon />
									</Button>
								</div>
							}
						/>
					))}
				</Listbox>
			</InfiniteScroll>
		</div>
	)
}
