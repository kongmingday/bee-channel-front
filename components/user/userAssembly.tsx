import { User, Button, Avatar } from '@nextui-org/react';
import { getAuthInfoLocal } from '@/utils/common/tokenUtils';
import {  useState } from 'react';
import clsx from 'clsx';
import { AllUserInfo, UserAndRelationship } from '@/types/auth';
import numeral from 'numeral';
import { subscribeAction } from '@/api/user';
import { useRouter } from 'next/navigation';

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST;

const UserItem = (props: { author: AllUserInfo }) => {
	const router = useRouter();

	const subscribeChange = async () => {
		await subscribeAction(props.author.id).then(res => {
			if (res.result) {
				setSub(pre => !pre);
			}
		});
	};

	const [isSub, setSub] = useState<boolean>(true);
	return (
		<div className='flex justify-between px-4'>
			<User
				onClick={() => {
					router.push(`/user/${props.author.id}`);
				}}
				name={props.author.username}
				description={
					<div className='mt-1 line-clamp-2'>{props.author.introduction}</div>
				}
				avatarProps={{
					className: 'w-12 h-12 flex-none',
					src: `${StoreFileHost}${props.author.profile}`,
				}}
			/>
			<Button
				onClick={() => {
					subscribeChange();
				}}
				radius='full'
				color='primary'
				className='ml-6 w-28'>
				{isSub ? 'Unsubscribe' : 'Subscribe'}
			</Button>
		</div>
	);
};

export const UserItemDisplay = (props: {
	userInfo?: UserAndRelationship;
	setUserInfo?: (userInfo: UserAndRelationship) => void;
}) => {
	const [briefState, setBriefState] = useState(false);
	const briefClass = clsx('cursor-default', {
		'line-clamp-2': briefState,
	});

	const handleOnSubscribeChange = async () => {
		await subscribeAction(props.userInfo?.id!).then(res => {
			if (res.code === 200 && props.userInfo && props.setUserInfo) {
				props.setUserInfo({
					...props.userInfo,
					hasConcern: !props.userInfo?.hasConcern,
				});
			}
		});
	};

	const authInfo = getAuthInfoLocal();
	return (
		<div className='flex gap-6 '>
			<Avatar
				className='flex-none w-20 h-20'
				src={`${StoreFileHost}${props.userInfo?.profile}`}
			/>
			<div className='flex flex-col gap-1'>
				<div className='flex items-center gap-6'>
					<div className='text-2xl'>{props.userInfo?.username}</div>
					{authInfo?.information?.id !== props.userInfo?.id && (
						<Button
							onPress={() => {
								handleOnSubscribeChange();
							}}
							className='mt-2'
							radius='full'
							color='primary'>
							{props.userInfo?.hasConcern ? 'Unsubscribe' : 'Subscribe'}
						</Button>
					)}
				</div>
				<div className='text-default-500'>
					{`${numeral(props.userInfo?.subscribeCount).format('0a')} subscriber`}
				</div>
				<p
					className={briefClass}
					onClick={() => {
						setBriefState(state => !state);
					}}>
					{props.userInfo?.introduction || 'the guy is so lazy'}
				</p>
			</div>
		</div>
	);
};

export const SearchUserGrid = (props: { userList: UserAndRelationship[] }) => {
	return (
		<div className='w-full grid grid-cols-2 gap-x-5 gap-y-10'>
			{props.userList.map(item => (
				<UserItemDisplay
					key={item.id}
					userInfo={item}
				/>
			))}
		</div>
	);
};

export const UserList = (props: { authorList: AllUserInfo[] }) => {
	return (
		<div className='w-full flex flex-col flex-wrap gap-8'>
			{props.authorList.map(item => (
				<UserItem
					author={item}
					key={item.id}
				/>
			))}
		</div>
	);
};
