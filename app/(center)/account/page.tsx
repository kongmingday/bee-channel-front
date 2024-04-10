'use client';

import { PictureIcon } from '@/components/common/icons';
import {} from '@/types';
import { getAuthInfo, setAuthInfo } from '@/utils/common/tokenUtils';
import {
	Avatar,
	Button,
	Input,
	Select,
	SelectItem,
	Textarea,
	user,
} from '@nextui-org/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { uploadSingleFile, uploadUserInfo } from '@/api/user';
import { Toast, ToastMode } from '@/components/common/toast';
import { AuthInfo } from '@/types/auth';

const genderItemList = ['Female', 'Male', 'Primary'];

export default function Page() {
	const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST;
	const [authInfo, setAuthInfo] = useState<AuthInfo | null>();

	const uploadRef = useRef<HTMLInputElement>(null);
	const [username, setUsername] = useState<string | undefined>(
		authInfo?.information?.username,
	);
	const [avatar, setAvatar] = useState<string | undefined>(
		`${StoreFileHost}${authInfo?.information?.profile}`,
	);
	const [introduction, setIntroduction] = useState<string | undefined>(
		authInfo?.information?.introduction,
	);
	const [birthday, setBirthday] = useState<string>(
		dayjs(authInfo?.information?.birthday).format('YYYY-MM-DD').toString(),
	);
	const [gender, setGender] = useState<number | undefined>(
		authInfo?.information?.gender,
	);

	const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.files && e.currentTarget.files[0] !== null) {
			setAvatar(URL.createObjectURL(e.currentTarget.files[0]));
		}
	};

	const handleAvartarUpload = async () => {
		const formData = new FormData();
		if (uploadRef.current && uploadRef.current.files) {
			formData.append('file', uploadRef.current?.files[0]);
		} else {
			return;
		}
		await uploadSingleFile(formData).then(res => {
			if (res.code === 200) {
				authInfo!.information! = {
					...authInfo!.information!,
					profile: res.result,
				};
				setAuthInfo(authInfo);
				Toast('upload success', ToastMode.SUCCESS);
			} else {
				Toast('upload failed', ToastMode.ERROR);
			}
		});
	};

	const invalidUserName = () => {
		if (!username) {
			return true;
		}
		if (username.length <= 0) {
			return true;
		}
		return false;
	};

	const handleUserInfoUpload = async () => {
		const userNameCheck = invalidUserName();
		if (userNameCheck) {
			return;
		}
		await uploadUserInfo({
			username,
			introduction,
			birthday: dayjs(birthday).format('YYYY-MM-DD hh:mm:ss').toString(),
			gender,
		}).then(res => {
			if (res.code === 200) {
				authInfo!.information! = {
					...authInfo!.information!,
					...res.result,
				};
				setAuthInfo(authInfo);
				Toast('upload success', ToastMode.SUCCESS);
			} else {
				Toast('upload failed', ToastMode.ERROR);
			}
		});
	};

	useEffect(() => {
		const initialAuth = async () => {
			const data = await getAuthInfo();
			setAuthInfo(data);
			setUsername(data?.information?.username);
			setAvatar(`${StoreFileHost}${data?.information?.profile}`);
			setIntroduction(data?.information?.introduction);
			setBirthday(
				dayjs(data?.information?.birthday).format('YYYY-MM-DD').toString(),
			);
			setGender(data?.information?.gender);
		};
		initialAuth();
	}, []);

	return (
		<div className='w-fit flex flex-col gap-8'>
			<div className='flex h-fit items-center'>
				<div className='w-fit h-fit flex flex-col justify-center gap-4 items-center border-r-1 pr-8'>
					<Avatar
						className='w-20 h-20'
						src={avatar}
					/>
				</div>
				<div className='flex items-center gap-4 ml-8'>
					<Button
						color='primary'
						className='h-20 dark:text-white'
						onPress={() => {
							uploadRef.current?.click();
						}}
						startContent={
							<PictureIcon
								className='mr-2'
								size={32}
							/>
						}>
						Select Native Picture
					</Button>
					<Button
						className='dark:text-white'
						onPress={handleAvartarUpload}
						color='primary'>
						Update Avatar
					</Button>
					<input
						onChange={handleFileChange}
						type='file'
						className='hidden'
						accept='.png, .jpg, .jpeg'
						ref={uploadRef}
					/>
				</div>
			</div>
			<div className='flex items-center gap-4'>
				<p className='text-lg min-w-[110px] text-right dark:text-white'>
					Username:
				</p>
				<Input
					className='w-auto'
					isInvalid={invalidUserName()}
					value={username}
					onValueChange={setUsername}
				/>
			</div>
			<div className='flex gap-4'>
				<p className='text-lg min-w-[110px] text-right dark:text-white'>
					Introduction:
				</p>
				<Textarea
					className='max-w-[600px]'
					value={introduction}
					onValueChange={setIntroduction}
				/>
			</div>
			<div className='flex gap-4 items-center'>
				<p className='text-lg min-w-[110px] text-right dark:text-white'>
					Birthday:
				</p>
				<Input
					type='date'
					value={birthday}
					onChange={e => {
						setBirthday(e.currentTarget.value);
					}}
					max={dayjs().format('YYYY-MM-DDThh:mm')}
					className='w-auto'
				/>
			</div>
			<div className='flex gap-4 items-center'>
				<p className='text-lg min-w-[110px] text-right dark:text-white'>
					Gender:
				</p>
				<Select
					labelPlacement='outside'
					placeholder='Select Gender'
					className='w-[160px]'
					selectionMode='single'
					selectedKeys={[gender?.toString() || '0']}>
					{genderItemList.map((item, index) => (
						<SelectItem
							key={index.toString()}
							onPress={() => {
								setGender(index);
							}}>
							{item}
						</SelectItem>
					))}
				</Select>
			</div>
			<Button
				color='primary'
				onPress={handleUserInfoUpload}
				className='dark:text-white w-fit mt-10 self-center'>
				Update Information
			</Button>
		</div>
	);
}
