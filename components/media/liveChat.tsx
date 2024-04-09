'use client';
import {
	Avatar,
	Button,
	Textarea,
	Divider,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Chip,
	Input,
	Tooltip,
	Checkbox,
	Image,
} from '@nextui-org/react';
import React, { useRef, useState, useEffect } from 'react';

import { ArrowLeftIcon, CloseIcon, MoneyIcon } from '../common/icons';
import { useWebSocket } from '@/hooks/useWebSocket';
import { getAuthInfoLocal } from '@/utils/common/tokenUtils';
import { LiveMessage } from '@/types/live';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { EmojiPicker } from './chatComment';
import { getQrcCode } from '@/api/order';
import { PayType } from '@/types/enum';

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST;

const SuperChat = () => {
	const [payAmount, setPayAmount] = useState('');
	const [needMessage, setNeedMessage] = useState(true);
	const [message, setMessage] = useState('');
	const [qrcCode, setQrcCode] = useState<string>('');
	const liveParam = useAppSelector(state => state.live);

	const handleSuperChatCommit = async () => {
		const amount = Number.parseFloat(payAmount);
		if (amount >= 500) {
			return;
		}
		if (message.length > 50 || (needMessage && message.trim().length === 0)) {
			return;
		}
		const { msg } = await getQrcCode({
			payType: PayType.ALIPAY,
			deriveId: liveParam.roomId,
			message: needMessage ? message : null,
			totalPrice: amount,
			userId: liveParam.userId,
		});
		setQrcCode(msg);
	};

	return (
		<div className='flex flex-col items-center gap-2 w-[390px]'>
			{qrcCode && qrcCode.length > 0 ? (
				<>
					<div className='w-full flex items-center justify-between'>
						<Button
							isIconOnly
							variant='light'
							className='self-start'
							onClick={() => {
								setMessage('');
								setQrcCode('');
							}}>
							<ArrowLeftIcon />
						</Button>
						<p>Please scan by AliPay</p>
					</div>
					<div className='w-full flex flex-col items-center'>
						<Image
							alt='pay qcr code'
							src={qrcCode}
						/>
					</div>
				</>
			) : (
				<>
					<div className='flex w-full justify-around gap-4'>
						<picture>
							<img
								alt='super chat'
								src='/super_chat_v1.webp'
								width={100}
							/>
						</picture>
						<div className='flex flex-col justify-center'>
							<div className='text-2xl w-full'>Super Chat</div>
							<div className='text-xl w-full'>Make your message stand out</div>
						</div>
					</div>
					<LiveChatInputBase moreFunction={setMessage} />
					<Tooltip
						placement='right'
						className='p-2'
						content='Must be less than 500'>
						<div className='flex items-center gap-2'>
							<p className='text-lg'>Pay</p>
							<Input
								size='sm'
								variant='underlined'
								classNames={{
									input: 'text-lg text-center',
								}}
								type='number'
								className='w-12 '
								value={payAmount}
								onValueChange={setPayAmount}
							/>
							<p className='text-lg'>Yuan</p>
						</div>
					</Tooltip>
					<Checkbox
						defaultSelected
						isSelected={needMessage}
						onValueChange={setNeedMessage}>
						Need Message
					</Checkbox>
					<Button
						onPress={handleSuperChatCommit}
						color='primary'
						fullWidth>
						Commit
					</Button>
				</>
			)}
		</div>
	);
};

const LiveChatInputBase = (props: {
	handleSendMessage?: () => void;
	enterKeyActive?: boolean;
	moreFunction?: (value: string) => void;
}) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	let [message, setMessage] = useState('');
	const liveParam = useAppSelector(state => state.live);
	const authInfo = getAuthInfoLocal();

	const handleSendMessage = () => {
		if (message.length > 50 || message.trim().length === 0) {
			return;
		}
		const liveMessage = {
			userId: liveParam.userId,
			profile: authInfo?.information?.profile,
			username: authInfo?.information?.username,
			roomId: liveParam.roomId,
			message: message,
			system: false,
		};
		liveParam.webSocket?.send(JSON.stringify(liveMessage));
		setMessage('');
	};

	return (
		<div className='flex flex-1 items-center gap-4 w-full'>
			<Textarea
				minRows={1}
				maxRows={2}
				variant='bordered'
				ref={inputRef}
				classNames={{
					input: 'scrollbar outline-none',
				}}
				placeholder='Only can be 50 letters'
				value={message}
				onValueChange={value => {
					setMessage(value);
					if (props.moreFunction) {
						props.moreFunction(value);
					}
				}}
				onKeyDown={e => {
					if (props.enterKeyActive && e.key === 'Enter') {
						e.preventDefault();
						if (props.handleSendMessage) {
							props.handleSendMessage();
							return;
						}
						handleSendMessage();
					}
				}}
				fullWidth
				isInvalid={message.length > 50}
			/>
			<EmojiPicker
				inputRef={inputRef}
				setComment={setMessage}
			/>
		</div>
	);
};

const LiveChatInput = () => {
	return (
		<div className='flex gap-4 w-full items-center'>
			<LiveChatInputBase enterKeyActive />
			<Popover
				placement='top-end'
				size='lg'
				showArrow={true}>
				<PopoverTrigger>
					<Button
						size='sm'
						variant='light'
						isIconOnly>
						<MoneyIcon size={20} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='p-4'>
					<SuperChat />
				</PopoverContent>
			</Popover>
		</div>
	);
};

const PayHeader = (props: {
	payHistory: LiveMessage[];
	setPayHistory: (value: LiveMessage[]) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [displayMessage, setDisplayMessage] = useState<LiveMessage | null>(
		null,
	);

	const setDisplay = (data: LiveMessage) => {
		setDisplayMessage(data);
		setIsOpen(true);
	};

	return (
		<div className='flex gap-2 overflow-y-auto scrollbar p-2 w-full'>
			{props.payHistory.length > 0 ? (
				props.payHistory.map((item, index) => (
					<Chip
						key={index}
						onClick={() => {
							setDisplay(item);
						}}
						color='warning'
						className='w-full h-full p-1 cursor-pointer select-none'
						avatar={
							<Avatar
								name='test flex-none'
								src={`${StoreFileHost}${item.profile}`}
							/>
						}>
						{item.amount}
					</Chip>
				))
			) : (
				<p className='w-full text-center text-slate-500'>No SuperChat</p>
			)}
			{isOpen && (
				<Card className='w-[95%] absolute top-28'>
					<CardHeader className='justify-between py-0'>
						<p>Pay {displayMessage?.amount} Yuan</p>
						<Button
							isIconOnly
							radius='full'
							startContent={<CloseIcon />}
							onPress={() => {
								setIsOpen(false);
							}}
							variant='light'
						/>
					</CardHeader>
					<CardBody>
						<div className='flex w-full gap-2'>
							<Avatar
								className='flex-none'
								size='sm'
								name='sd'
								src={`${StoreFileHost}${displayMessage?.profile}`}
							/>
							<div className='flex flex-col w-full'>
								<p className='text-default-500 w-[330px]'>
									{displayMessage?.username}
								</p>
								<a className='w-[330px]'>{displayMessage?.message}</a>
							</div>
						</div>
					</CardBody>
				</Card>
			)}
		</div>
	);
};

export const LiveChat = () => {
	const [hideState, setHideState] = useState(false);
	const [autoScroll, setAutoScroll] = useState<boolean>(true);
	const liveParam = useAppSelector(state => state.live);
	const [omissionCount, setOmissionCount] = useState(0);
	const router = useRouter();
	const [messageHistory, setMessageHistory] = useState<LiveMessage[]>([]);
	const [payHistory, setPayHistory] = useState<LiveMessage[]>([]);

	const goToUserIndex = (userId: string) => {
		router.push(`/user/${userId}`);
	};

	const insertToPayMessage = (data: LiveMessage) => {
		let targetIndex = payHistory.length;
		payHistory.some((item, index) => {
			const flag = item.amount < data.amount;
			if (flag) {
				targetIndex = index;
			}
			if (index === payHistory.length - 1) {
				targetIndex = index;
			}
			return flag;
		});
		setPayHistory(pre => {
			pre.splice(targetIndex, 0, data);
			return [...pre];
		});
	};

	const handleOnMessage = (event: MessageEvent<any>) => {
		const message: LiveMessage = JSON.parse(event.data);
		if (message.system) {
			return;
		}
		if (message.message && message.message.trim().length > 0) {
			setMessageHistory(pre => {
				return [...pre, message];
			});
		}
		if (message.amount > 0) {
			insertToPayMessage(message);
		}
	};

	const [webSocket] = useWebSocket(
		`/${liveParam.roomId}/${liveParam.userId}`,
		() => {},
		handleOnMessage,
		() => {},
	);

	useEffect(() => {
		const containerBox = document.querySelector(
			'.message-container',
		) as HTMLDivElement;

		if (!containerBox) {
			return;
		}

		const handleOnScroll = () => {
			const isInBottom =
				containerBox.scrollHeight ===
				Math.ceil(containerBox.scrollTop) + containerBox.clientHeight;
			if (isInBottom) {
				setOmissionCount(0);
			}
			setAutoScroll(isInBottom);
		};

		containerBox.addEventListener('scroll', handleOnScroll);

		return () => {
			containerBox.removeEventListener('scroll', handleOnScroll);
		};
	}, []);

	useEffect(() => {
		if (autoScroll) {
			const containerBox = document.querySelector('.message-container');
			if (containerBox) {
				containerBox.scrollTop = containerBox.scrollHeight;
			}
		} else {
			setOmissionCount(pre => pre + 1);
		}
	}, [messageHistory]);

	return (
		<Card className='mb-6 dark:shadow-white-lg w-[450px] rounded-md'>
			{!hideState && (
				<>
					<CardHeader className='px-6'>
						<p className='text-xl'>Live Chat</p>
					</CardHeader>
					<Divider />
					<CardHeader className='p-0 '>
						<PayHeader
							payHistory={payHistory}
							setPayHistory={setPayHistory}
						/>
					</CardHeader>
					<Divider />
					<CardBody className='h-[350px] p-5 scrollbar message-container'>
						<div className='flex flex-col gap-2'>
							{messageHistory.map((item, index) => (
								<div
									key={index}
									className='flex w-full gap-2'>
									<Avatar
										className='flex-none'
										size='sm'
										onClick={() => {
											goToUserIndex(item.userId);
										}}
										src={`${StoreFileHost}${item.profile}`}
									/>
									<div className='flex flex-col w-full'>
										<p
											onClick={() => {
												goToUserIndex(item.userId);
											}}
											className='text-default-500 w-[350px]'>
											{item.username}
										</p>
										<a className='w-[370px]'>{item.message}</a>
									</div>
								</div>
							))}
						</div>
					</CardBody>
					<Divider />
					<CardFooter className='relative overflow-visible'>
						{omissionCount !== 0 && (
							<Chip
								color='primary'
								className='absolute left-1/2 -top-9 -translate-x-1/2'>
								New +{omissionCount}
							</Chip>
						)}
						<LiveChatInput />
					</CardFooter>
					<Divider />
				</>
			)}
			<CardFooter>
				<Button
					fullWidth
					variant='light'
					onPress={() => {
						setHideState(pre => !pre);
					}}>
					Hide Chat
				</Button>
			</CardFooter>
		</Card>
	);
};
