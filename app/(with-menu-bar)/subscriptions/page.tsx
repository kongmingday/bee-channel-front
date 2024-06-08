/*
 * @Author: err0r
 * @Date: 2023-09-25 22:59:33
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-29 14:48:18
 * @Description:
 * @FilePath: \bee-channel-front\app\subscriptions\page.tsx
 */
'use client'

import { Input, Pagination } from '@nextui-org/react'
import { UserList } from '@/components/user/userAssembly'
import { LinkTabs } from '@/components/common/tabs'
import { Key, useEffect, useState } from 'react'
import { AllUserInfo } from '@/types/auth'
import { getSubscription } from '@/api/user'
import { SimpleParams } from '@/types'
import { Kbd } from '@nextui-org/kbd'
import { EmptyData, MediaScrollList } from '@/components/media/mediaAssembly'
import { getSubscriptionVideoList } from '@/api/media'
import { SimpleMedia } from '@/types/media'
import { isExist } from '@/utils/common/tokenUtils'

const UserListFragment = () => {
	const [subscriptions, setSubscriptions] = useState<AllUserInfo[]>([])
	const [keyword, setKeyword] = useState<string>('')
	const [pageParams, setPageParams] = useState<SimpleParams>({
		pageSize: 6,
		total: 0,
	})
	const [pageNo, setPageNo] = useState<number>(1)

	const fetchData = async () => {
		if (!isExist()) {
			return
		}
		const { result } = await getSubscription({
			pageNo,
			pageSize: pageParams.pageSize,
			keyword,
		})
		setPageParams((pre) => ({ ...pre, total: result.total }))
		setSubscriptions(result.data)
	}

	useEffect(() => {
		fetchData()
	}, [pageNo])

	return (
		<div className='flex flex-1 flex-col h-full'>
			<Input
				className='w-15 mx-4 mb-5'
				type='search'
				label='Search'
				labelPlacement='outside-left'
				value={keyword}
				onValueChange={setKeyword}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						fetchData()
					}
				}}
				endContent={<Kbd keys={['enter']}>Enter</Kbd>}
			/>
			{subscriptions.length > 0 ? (
				<div className='h-full flex flex-col justify-between'>
					<UserList authorList={subscriptions} />
					<Pagination
						className='w-full flex justify-center mt-2'
						classNames={{
							cursor: 'shadow-md opacity-100 ',
						}}
						page={pageNo}
						total={Math.ceil(pageParams.total / pageParams.pageSize)}
						onChange={setPageNo}
						initialPage={1}
					/>
				</div>
			) : (
				<EmptyData />
			)}
		</div>
	)
}

export default function Page() {
	const linkData = ['Video', 'User']
	const [currentKey, setCurrentKey] = useState('')
	const currentKeyChangeHandle = (key: Key) => {
		setCurrentKey(key.toString())
	}
	const [subscriptionList, setSubscriptionList] = useState<SimpleMedia[]>([])
	const [pageParams, setPageParams] = useState<SimpleParams>({
		pageSize: 6,
		total: 0,
	})
	const [pageNo, setPageNo] = useState<number>(1)

	const fetchData = async () => {
		if (!isExist()) {
			return
		}

		const { result } = await getSubscriptionVideoList({
			pageNo,
			pageSize: pageParams.pageSize,
		})

		setSubscriptionList((pre) => [...pre, ...result.data])
		setPageParams((pre) => ({ ...pre, total: result.total }))
		setPageNo((pre) => pre + 1)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const tabsOptions = [
		{
			key: 'Video',
			content: (
				<MediaScrollList
					mediaList={subscriptionList}
					pageProcess={{
						allPageParams: { pageParams, setPageParams, pageNo, setPageNo },
						loadMore: fetchData,
					}}
				/>
			),
		},
		{
			key: 'User',
			content: <UserListFragment />,
		},
	]

	return (
		<>
			<div className='w-full flex justify-center'>
				<div className='flex flex-wrap w-full lg:w-[90%]'>
					<LinkTabs
						tabItemList={linkData}
						selectChange={(key) => currentKeyChangeHandle(key)}
					/>
					{tabsOptions.find((item) => item.key == currentKey)?.content}
				</div>
			</div>
		</>
	)
}
