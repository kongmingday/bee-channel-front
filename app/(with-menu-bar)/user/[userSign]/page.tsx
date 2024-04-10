'use client';
import clsx from 'clsx';
import numberal from 'numeral';
import { getUserFullInfo } from '@/api/user';
import { UserAndRelationship } from '@/types/auth';
import { getAuthInfo, getAuthInfoLocal } from '@/utils/common/tokenUtils';
import {
	Avatar,
	Image,
	Button,
	Tabs,
	Tab,
	Pagination,
	Spinner,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { SimpleMediaModule } from '@/components/media/mediaAssembly';
import { SimpleParams } from '@/types';
import { getAuthorVideoList, getPersonalVideoList } from '@/api/media';
import { SimpleMedia } from '@/types/media';
import { UserItemDisplay } from '@/components/user/userAssembly';

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST;

const UserTabs = (props: { userId: string }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [videoList, setVideoList] = useState<SimpleMedia[]>([]);
	const [simpleParams, setSimpleParams] = useState<SimpleParams>({
		pageSize: 8,
		total: 0,
	});

	const resData = [
		{
			title: 'Videos',
			content: <SimpleMediaModule videoList={videoList} />,
		},
		// Playlists", "Community", "Channel"
	];

	const fetchData = async (pageNo?: number) => {
		setIsLoading(true);
		const { result } = await getAuthorVideoList(props.userId, {
			pageNo: pageNo || 1,
			pageSize: simpleParams.pageSize,
		});
		setVideoList(result.data);
		setSimpleParams(pre => {
			return {
				...pre,
				total: result.total,
			};
		});
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='w-full'>
			<Tabs
				className='w-full'
				classNames={{
					tabList:
						'gap-6 w-full relative rounded-none px-20 py-0 border-b border-divider',
					cursor: 'w-full',
					tab: 'max-w-fit px-0 h-12 text-md',
				}}
				variant='underlined'>
				{resData.map((item, index) => (
					<Tab
						key={index}
						title={item.title}>
						{item.content}
					</Tab>
				))}
			</Tabs>
			{isLoading && (
				<div className='w-full flex justify-center py-32'>
					<Spinner
						color='warning'
						classNames={{
							wrapper: 'w-20 h-20',
						}}
					/>
				</div>
			)}
			<Pagination
				className='w-full flex justify-center mt'
				classNames={{
					cursor: 'shadow-md opacity-100 ',
				}}
				total={Math.ceil(simpleParams.total / simpleParams.pageSize)}
				onChange={(page: number) => {
					fetchData(page);
				}}
				initialPage={1}
			/>
		</div>
	);
};

export default function Page({
	params,
}: {
	params: {
		userSign: string;
	};
}) {
	const briefImage = false;
	const authInfo = getAuthInfoLocal();
	const [userInfo, setUserInfo] = useState<UserAndRelationship>();

	useEffect(() => {
		const fetchUserInfo = async () => {
			const { result } = await getUserFullInfo(
				params.userSign,
				authInfo?.information?.id,
			);
			if (result) {
				setUserInfo(result);
			}
		};

		fetchUserInfo();
	}, []);

	return (
		<div className='flex flex-col gap-4 '>
			<div className='px-20'>
				{briefImage && (
					<Image
						removeWrapper
						className='w-full h-[150px] object-cover mb-4'
						alt='Above Brief Image'
						src='https://nextui-docs-v2.vercel.app/images/album-cover.png'
					/>
				)}
				<UserItemDisplay
					userInfo={userInfo}
					setUserInfo={setUserInfo}
				/>
				<UserTabs userId={params.userSign} />
			</div>
		</div>
	);
}
