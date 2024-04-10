'use client';

import { Tabs, Tab, Chip, Pagination, Kbd, Spinner } from '@nextui-org/react';
import { Category, SimpleMedia } from '@/types/media';
import { useEffect, useState } from 'react';
import { getCategoryList, searchVideoList } from '@/api/media';
import clsx from 'clsx';
import { MediaCardGrid } from '@/components/media/mediaAssembly';
import { useRouter, useSearchParams } from 'next/navigation';
import { SimpleParams } from '@/types';
import qs from 'qs';
import { SearchInput } from '@/components/common/navbar';
import { searchUserFullInfoList } from '@/api/user';
import { getAuthInfoLocal } from '@/utils/common/tokenUtils';
import { UserAndRelationship } from '@/types/auth';
import { SearchUserGrid } from '@/components/user/userAssembly';

const VideoSearchContent = () => {
	const sortMap = ['Most', 'Newest'];

	const searchParams = useSearchParams();
	const [pageParams, setPageParams] = useState<SimpleParams>({
		pageSize: 16,
		total: 0,
	});
	const [pageNo, setPageNo] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [videoList, setVideoList] = useState<SimpleMedia[]>([]);
	const [sortSelected, setSortSelected] = useState(0);
	const [categorySelected, setCategorySelected] = useState(
		searchParams.get('categoryId') || '-1',
	);

	const [categoryList, setCategoryList] = useState<Category[]>([]);
	const chipBaseStyle = 'px-2 py-3 text-base bg-transparent cursor-pointer';

	const fetchData = async () => {
		setIsLoading(true);
		const { result } = await searchVideoList({
			keyword: searchParams.get('keyword') || undefined,
			categoryId:
				categorySelected !== '-1'
					? Number.parseInt(categorySelected)
					: undefined,
			sortBy: sortSelected,
			pageNo: pageNo,
			pageSize: pageParams.pageSize,
		});
		setVideoList(result.data);
		setPageParams(pre => {
			return {
				...pre,
				total: result.total,
			};
		});
		setIsLoading(false);
	};

	const fetchCategoryList = async () => {
		await getCategoryList().then(res => {
			setCategoryList([{ id: '-1', name: 'All' }, ...res.result]);
		});
	};

	useEffect(() => {
		fetchData();
	}, [sortSelected, categorySelected, pageNo, searchParams.get('keyword')]);

	useEffect(() => {
		fetchCategoryList();
	}, []);

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-col gap-3'>
				<div className='flex gap-4'>
					{sortMap.map((item, index) => (
						<Chip
							radius='sm'
							color='primary'
							onClick={() => {
								setPageNo(1);
								setSortSelected(index);
							}}
							className={clsx(chipBaseStyle, {
								'bg-primary': index === sortSelected,
							})}
							key={index}>
							{item}
						</Chip>
					))}
				</div>
				<div className='flex gap-4'>
					{categoryList.map(item => (
						<Chip
							radius='sm'
							color='primary'
							key={item.id}
							onClick={() => {
								setPageNo(1);
								setCategorySelected(item.id);
							}}
							className={clsx(chipBaseStyle, {
								'bg-primary': item.id === categorySelected,
							})}>
							{item.name}
						</Chip>
					))}
				</div>
			</div>
			{isLoading ? (
				<Spinner
					color='warning'
					className='mt-32'
					classNames={{
						wrapper: 'w-20 h-20',
					}}
				/>
			) : pageParams.total > 0 ? (
				<>
					<MediaCardGrid mediaList={videoList} />
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
				</>
			) : (
				<>
					<div>No Data</div>
				</>
			)}
		</div>
	);
};

const UserSearchContent = () => {
	const sortMap = ['Most', 'Newest'];

	const chipBaseStyle = 'px-2 py-3 text-base bg-transparent cursor-pointer';
	const authInfo = getAuthInfoLocal();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [sortSelected, setSortSelected] = useState(0);
	const [pageParams, setPageParams] = useState<SimpleParams>({
		pageSize: 16,
		total: 0,
	});
	const [pageNo, setPageNo] = useState<number>(1);
	const [userList, setUserList] = useState<UserAndRelationship[]>([]);

	const fetchData = async () => {
		setIsLoading(true);
		const { result } = await searchUserFullInfoList(
			{
				pageNo,
				pageSize: pageParams.pageSize,
				keyword: searchParams.get('keyword') || undefined,
				sortBy: sortSelected,
			},
			authInfo?.information?.id,
		);
		if (result) {
			setUserList(result.data);
			setPageParams(pre => {
				return { ...pre, total: result.total };
			});
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [sortSelected, pageNo, searchParams.get('keyword')]);

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex gap-4'>
				{sortMap.map((item, index) => (
					<Chip
						radius='sm'
						color='primary'
						onClick={() => {
							setPageNo(1);
							setSortSelected(index);
						}}
						className={clsx(chipBaseStyle, {
							'bg-primary': index === sortSelected,
						})}
						key={index}>
						{item}
					</Chip>
				))}
			</div>
			{isLoading ? (
				<Spinner
					color='warning'
					className='mt-32'
					classNames={{
						wrapper: 'w-20 h-20',
					}}
				/>
			) : (
				<>
					<SearchUserGrid userList={userList} />
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
				</>
			)}
		</div>
	);
};

const SearchTasb = () => {
	const tabList = [
		{
			title: 'Video',
			content: <VideoSearchContent />,
		},
		{
			title: 'User',
			content: <UserSearchContent />,
		},
	];

	return (
		<Tabs
			className='w-full'
			classNames={{
				tabList:
					'gap-6 w-full relative rounded-none px-20 py-0 border-b border-divider',
				cursor: 'w-full',
				tab: 'max-w-fit px-0 h-12 text-md',
			}}
			variant='underlined'>
			{tabList.map((item, index) => (
				<Tab
					key={index}
					title={item.title}
					className='w-full'>
					<div className='px-16'>{item.content}</div>
				</Tab>
			))}
		</Tabs>
	);
};

export default function Page({ params }: { params: {} }) {
	return (
		<div className='w-full h-full flex flex-col items-center gap-4'>
			<SearchInput className='w-1/3' />
			<SearchTasb />
		</div>
	);
}
