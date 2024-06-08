/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-20 23:16:25
 * @Description:
 * @FilePath: \bee-channel-front\app\(with-none)\sign-in\page.tsx
 */

'use client';
import { WeChatIcon } from '@/components/common/icons';
import { WeChatLogin } from '@/components/common/wechat-login';
import {
	Button,
	Input,
	Link,
	Image,
	Divider,
	Spinner,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCode, login } from '@/api/auth';
import { FormParams, SignInKeyParams } from '@/types/auth';
import { SignInType } from '@/types/enum';
import { sendCodeToEmail, verify } from '@/api/checkcode';
import { setAuthToken } from '@/utils/common/tokenUtils';
import { useRouter } from 'next/navigation';
import { waitForSeconds } from '@/components/common/toast';

const inputMap: FormParams[] = [
	{
		label: 'Email',
		type: 'text',
		name: 'email',
		placeholder: 'Enter your email',
		error: 'please enter correct email',
		rule: {
			required: true,
			pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
		},
	},
	{
		label: 'Password',
		type: 'password',
		name: 'password',
		placeholder: 'Enter your password',
		error: 'please enter correct password',
		rule: {
			required: true,
		},
	},
	{
		label: 'Code',
		type: 'text',
		name: 'code',
		placeholder: 'enter the code',
		error: 'code error',
		rule: {
			required: true,
		},
	},
];

const CommonForm = () => {
	const router = useRouter();
	const [isQuick, setIsQuick] = useState(false);
	const [signMethod, setSignMethod] = useState<string>(SignInType.EMAIL);
	const [signMethodMap, setSignMethodMap] = useState([inputMap[0]]);
	const [codeSource, setCodeSource] = useState({ source: '', key: '' });
	const {
		register,
		handleSubmit,
		setError,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	});

	const methodMemo = useMemo(() => {
		return signMethod === SignInType.EMAIL
			? SignInType.PASSWORD
			: SignInType.EMAIL;
	}, [signMethod]);

	const signMethodChange = useCallback(() => {
		setSignMethod(methodMemo);
		if (methodMemo === SignInType.EMAIL) {
			setSignMethodMap([inputMap[0]]);
		} else {
			setSignMethodMap([inputMap[0], inputMap[1]]);
		}
	}, [methodMemo]);

	useEffect(() => {
		if (signMethod === SignInType.PASSWORD) {
			fetchCode(setCodeSource);
		}
	}, [signMethod]);

	const onSubmit = (data: any) => {
		let key;
		if (signMethod === SignInType.EMAIL) {
			key = 'sendKey:' + data.email;
		} else {
			key = codeSource.key;
		}

		verify(key, data.code, () => {
			setError('code', new Error(inputMap[2].error));
		})
			.then(() => {
				return login({
					...data,
					authType: signMethod,
				});
			})
			.then(res => {
				setAuthToken(res.access_token);
				router.push('/');
			})
			.catch(error => {
				fetchCode(setCodeSource);
			});
	};

	const sendCode = () => {
		const email = getValues('email');
		if (!email) {
			setError('email', new Error(inputMap[0].error));
			return;
		}
		sendCodeToEmail(email);
		setIsQuick(true);
		waitForSeconds(10 * 1000).then(() => {
			setIsQuick(false);
		});
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-4'>
				{signMethodMap.map((item, index) => (
					<Input
						autoComplete='off'
						key={index}
						className='mb-6'
						classNames={{
							label: 'text-md',
							input: 'pl-2',
							inputWrapper: 'h-12 mt-2',
						}}
						fullWidth
						isClearable
						type={item.type}
						label={item.label}
						labelPlacement='outside'
						placeholder={item.placeholder}
						errorMessage={errors[item.name as SignInKeyParams] && item.error}
						{...register(item.name as SignInKeyParams, item.rule)}
					/>
				))}
				<div className='flex gap-4 items-end'>
					<Input
						autoComplete='off'
						className='w-3/5 flex'
						classNames={{
							label: 'text-lg',
							input: 'text-md pl-2',
							inputWrapper: 'h-12 mt-2',
						}}
						fullWidth
						isClearable
						label={inputMap[2].label}
						labelPlacement='outside'
						placeholder={inputMap[2].placeholder}
						errorMessage={errors['code'] && inputMap[2].error}
						{...register('code', inputMap[2].rule)}
					/>
					{signMethod !== SignInType.EMAIL ? (
						<Image
							removeWrapper
							className='ml-4 h-12 w-2/5 object-fill'
							onClick={() => fetchCode(setCodeSource)}
							alt='verify code'
							src={codeSource.source}
						/>
					) : (
						<Button
							onClick={() => {
								sendCode();
							}}
							className='h-12
							bg-gradient-to-tr from-pink-500 to-yellow-500
							text-white shadow-lg w-3/5'>
							{isQuick ? (
								<>
									<span>Wait</span>
									<Spinner color='white' />
								</>
							) : (
								'Send Code'
							)}
						</Button>
					)}
				</div>
				<Button
					type='submit'
					className='mt-1 h-12 
						bg-gradient-to-tr from-pink-500 to-yellow-500 
						text-white shadow-lg'
					fullWidth>
					Sign in
				</Button>
			</form>
			<Link
				onClick={() => {
					signMethodChange();
				}}
				className='text-default-400 my-6'>
				Sign in using {methodMemo}
			</Link>
		</>
	);
};

const SignInForm = (props: {}) => {
	const [isWeChat, setIsWeChat] = useState(false);

	return (
		<div className='w-full mt-4 flex flex-col items-center'>
			{isWeChat ? <WeChatLogin /> : <CommonForm />}
			<div className='flex justify-center items-center w-full overflow-hidden'>
				<Divider className='w-[45%]' />
				<p className='mx-4 text-default-400'>or</p>
				<Divider className='w-[45%]' />
			</div>
			<div className='w-full mt-2 px-2'>
				<Button
					variant='light'
					isIconOnly>
					<WeChatIcon
						onClick={() => {
							setIsWeChat(!isWeChat);
						}}
					/>
				</Button>
			</div>
		</div>
	);
};

export default function Page() {
	return (
		<div className='flex gap-48 justify-center items-center h-full grow'>
			<div className='relative h-full'>
				<Image
					removeWrapper
					className='w-96 h-96 min-w-[384px] self-center'
					src='/sign_in.svg'
					alt='mojap'
				/>
			</div>
			<div className='w-[350px] flex flex-col items-center gap-4'>
				<div className='flex flex-col items-center'>
					<p className='text-4xl'>Sign in</p>
					<p className='text-default-400 mt-4'>
						First time here?
						<Link
							href='/sign-up'
							className='text-yellow-500 ml-2 cursor-pointer'>
							Sign up
						</Link>
					</p>
				</div>
				<SignInForm />
			</div>
		</div>
	);
}
