'use client';
import {
	ClockIcon,
	FailedIcon,
	OkIcon,
	PictureIcon,
	VideoIcon,
} from '@/components/common/icons';
import { AuditVideo, Category, FileUploadResult } from '@/types/media';
import {
	Tabs,
	Tab,
	Button,
	Image,
	Tooltip,
	Modal,
	useDisclosure,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Card,
	Select,
	SelectItem,
	CardBody,
	Chip,
	Pagination,
	Progress,
	Spinner,
} from '@nextui-org/react';
import { Textarea } from '@nextui-org/input';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { SimpleParams } from '@/types';
import {
	getCategoryList,
	getPersonalVideoList,
	uploadVideo,
} from '@/api/media';
import { AuditStatusType } from '@/types/enum';
import { handleUpload } from '@/utils/common/fileUpload';
import { uploadSingleFile } from '@/api/upload';
import { Toast, ToastMode } from '@/components/common/toast';

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST;
const AuditStatusIcon = (props: { status: AuditStatusType }) => {
	if (props.status === AuditStatusType.WAITING) {
		return (
			<>
				<ClockIcon size={25} />
				WAITING
			</>
		);
	} else if (props.status === AuditStatusType.APPROVED) {
		return (
			<>
				<OkIcon size={25} />
				APPROVED
			</>
		);
	} else if (props.status === AuditStatusType.UNAPPROVED) {
		return (
			<>
				<FailedIcon size={25} />
				UNAPPROVED
			</>
		);
	} else {
		return <></>;
	}
};

const AuditTable = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [auditList, setAuditList] = useState<AuditVideo[]>([]);
	const [simpleParams, setSimpleParams] = useState<SimpleParams>({
		pageSize: 6,
		total: 0,
	});

	const fetchData = async (pageNo?: number) => {
		setIsLoading(true);
		const { result } = await getPersonalVideoList(
			pageNo || 0,
			simpleParams.pageSize,
		);
		setAuditList(result.data);
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

	return isLoading ? (
		<div className='flex justify-center h-[500px] w-full'>
			<Spinner
				color='warning'
				classNames={{
					wrapper: 'w-20 h-20',
				}}
			/>
		</div>
	) : (
		<div className='flex flex-col gap-5'>
			{auditList && auditList.length > 0 ? (
				auditList.map(item => (
					<Card
						key={item.id}
						className='min-w-[820px]'>
						<CardBody>
							<div className='flex gap-8'>
								<Image
									alt='video cover'
									className='w-[300px]'
									src={`${StoreFileHost}${item.coverPath}`}
								/>
								<div className='flex flex-col gap-2 w-full'>
									<div className='flex justify-between items-end'>
										<p className='text-xl line-clamp-1 text-ellipsis'>
											{item.title}
										</p>
										<p className='text-xl line-clamp-1 text-ellipsis'>
											{dayjs(item.upTime).format('YYYY/MM/DD HH:mm')}
										</p>
									</div>
									<div className='flex gap-1 items-end text-lg'>
										<AuditStatusIcon status={item.supervise.status} />
									</div>
									{item.supervise?.status === AuditStatusType.UNAPPROVED && (
										<Textarea
											isReadOnly
											label='Unapproved reason'
											minRows={2}
											className='col-span-12 md:col-span-6 mb-6 md:mb-0 cursor-pointer'
											value={item.supervise.reason}
										/>
									)}
									<div className='flex items-end gap-6 grow'>
										{item.supervise && (
											<div>
												<Chip
													radius='sm'
													color='primary'
													className='mr-2'>
													Audit Time
												</Chip>
												<span>
													{dayjs(item.supervise.superviseTime).format(
														'YYYY/MM/DD HH:mm',
													)}
												</span>
											</div>
										)}
										{item.supervise?.status === AuditStatusType.APPROVED && (
											<div>
												<Chip
													radius='sm'
													color='primary'
													className='mr-2'>
													Publish Time
												</Chip>
												<span>
													{dayjs(item.supervise.superviseTime).format(
														'YYYY/MM/DD HH:mm',
													)}
												</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				))
			) : (
				<h1 className='flex flex-1 justify-center'>No data</h1>
			)}
			<Pagination
				className='w-full flex justify-center mt-5'
				classNames={{
					cursor: 'shadow-md bg-stone-200 dark:bg-primary',
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

const UploadModal = (props: {
	isOpen: boolean;
	onOpenChange: () => void;
	onFinish: () => void;
	setVideoUploadResult: (result: FileUploadResult) => void;
}) => {
	const uploadRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string>();
	const [processValue, setProcessValue] = useState<number>(0);

	const handleProcessChange = (finshPercent: number) => {
		setProcessValue(pre => pre + finshPercent);
	};

	return (
		<Modal
			isOpen={props.isOpen}
			onOpenChange={props.onOpenChange}>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Upload Video
						</ModalHeader>
						<ModalBody>
							<div className='flex gap-4 items-center'>
								<Button
									color='primary'
									onPress={() => {
										uploadRef.current?.click();
									}}
									startContent={<VideoIcon className='mr-2' />}>
									Select Native Video
								</Button>
								<p>{fileName || 'No File Choose'}</p>
							</div>
							<input
								type='file'
								accept='.mp4'
								ref={uploadRef}
								hidden
								onChange={() => {
									setFileName(uploadRef.current?.value);
								}}
							/>
							<Progress
								color='warning'
								size='sm'
								aria-label='Loading...'
								showValueLabel
								value={processValue}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								color='primary'
								onPress={() => {
									setProcessValue(0);
									handleUpload(
										uploadRef.current!,
										handleProcessChange,
										props.setVideoUploadResult,
									);
								}}>
								Upload
							</Button>
							<Button
								color='primary'
								onPress={props.onFinish}>
								Finish
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

const UploadForm = (props: { setSelectedKey: (key: string) => void }) => {
	const uploadRef = useRef<HTMLInputElement>(null);
	const [tags, setTags] = useState<string[]>([]);
	const [tagInputValue, setTagInputvalue] = useState<string>('');
	const [coverUploadResult, setCoverUploadResult] = useState<FileUploadResult>(
		{},
	);
	const [videoUploadResult, setVideoUploadResult] = useState<FileUploadResult>(
		{},
	);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectCategory, setSelectCategory] = useState<number>(1);
	const [categoryList, setCategoryList] = useState<Category[]>([]);
	const [openTime, setOpenTime] = useState<string>(
		dayjs().format('YYYY-MM-DDTHH:mm'),
	);
	const [title, setTitle] = useState<string>('');
	const [introduction, setIntroduction] = useState<string>('');

	const handleCloseTag = (tagToRemove: string) => {
		setTags(tags.filter(tag => tag !== tagToRemove));
	};

	const handleAddTag = (tagToAdd: string) => {
		if (!tagToAdd || tagToAdd.length <= 0) {
			return;
		}
		if (tags.length >= 5) {
			return;
		}

		const duplicate = tags.filter(tag => tag === tagToAdd);
		if (duplicate.length > 0) {
			return;
		}
		setTags(pre => {
			pre.push(tagToAdd);
			return [...pre];
		});
		setTagInputvalue('');
	};

	const handleCoverUpload = async () => {
		const formData = new FormData();
		if (uploadRef.current && uploadRef.current.files) {
			formData.append('file', uploadRef.current?.files[0]);
		} else {
			return;
		}
		await uploadSingleFile(formData).then(res => {
			if (res.code === 200) {
				setCoverUploadResult(res.result);
			} else {
				Toast('upload failed', ToastMode.ERROR);
			}
		});
	};

	const onNextPress = () => {
		const introductionHasLength = introduction.length > 0;
		const titleHasLength = title.length > 0;
		const tagsHasLength = tags.length > 0;
		const coverHasValue = coverUploadResult.filePath;
		if (
			introductionHasLength &&
			titleHasLength &&
			tagsHasLength &&
			coverHasValue
		) {
			onOpen();
		} else {
			Toast('Please check the video information', ToastMode.DANGER);
		}
	};

	const onFinish = async () => {
		if (!videoUploadResult.filePath) {
			Toast('Please check the video file', ToastMode.DANGER);
			return;
		}
		await uploadVideo({
			title,
			introduction,
			categoryId: selectCategory,
			publicTime: dayjs(openTime).format('YYYY-MM-DD HH:mm:ss'),
			tag: JSON.stringify(tags),
			coverId: coverUploadResult.fileId,
			coverPath: coverUploadResult.filePath,
			saveId: videoUploadResult.fileId,
			savePath: videoUploadResult.filePath,
		}).then(res => {
			if (res.code === 200) {
				Toast('the video upload has successd', ToastMode.SUCCESS);
				props.setSelectedKey('AuditList');
			} else {
				Toast('the video upload has error', ToastMode.ERROR);
			}
		});
	};

	useEffect(() => {
		const fetchCategory = async () => {
			const { result } = await getCategoryList();
			setCategoryList(result);
		};
		fetchCategory();
	}, []);

	return (
		<Card className='flex flex-col gap-8 p-5 overflow-visible bg-sd-content'>
			<div className='flex items-center'>
				<p className='min-w-[110px] text-center dark:text-white'>
					Title:&nbsp;
				</p>
				<Input
					variant='underlined'
					value={title}
					onValueChange={setTitle}
					className='w-auto'
					classNames={{
						inputWrapper: 'py-0',
					}}
				/>
			</div>
			<div className='flex items-start'>
				<p className='min-w-[110px] text-center dark:text-white'>
					Cover:&nbsp;
				</p>
				{coverUploadResult.filePath ? (
					<Image
						alt='cover-image'
						className='w-[280px] h-[150px]'
						onClick={() => {
							uploadRef.current?.click();
						}}
						src={`${StoreFileHost}${coverUploadResult.filePath}`}
					/>
				) : (
					<Button
						color='primary'
						className='w-[280px] h-[150px] dark:text-white'
						onPress={() => {
							uploadRef.current?.click();
						}}
						startContent={<PictureIcon className='mr-2' />}>
						Select Native Picture
					</Button>
				)}
				<input
					type='file'
					className='hidden'
					accept='.png, .jpg, .jpeg'
					onChange={handleCoverUpload}
					ref={uploadRef}
				/>
			</div>
			<div className='flex items-center'>
				<p className='min-w-[110px] text-center dark:text-white'>Tags:&nbsp;</p>
				<div className='flex gap-2'>
					{tags.length > 0 ? (
						<>
							{tags.map((tag, index) => (
								<Chip
									key={index}
									onClose={() => handleCloseTag(tag)}
									variant='flat'>
									{tag}
								</Chip>
							))}
						</>
					) : (
						<p>No Tag</p>
					)}
				</div>
				<Tooltip
					className='bg-sd-background'
					content='Only 5 tags, a tag can be 15 letter and must provide a tag'>
					<Input
						className='w-40 ml-4'
						value={tagInputValue}
						onValueChange={setTagInputvalue}
						onKeyDown={event => {
							if (event.key === 'Enter') {
								handleAddTag(tagInputValue);
							}
						}}
						endContent={
							<Button
								size='sm'
								onPress={() => {
									handleAddTag(tagInputValue);
								}}
								isIconOnly>
								Add
							</Button>
						}
					/>
				</Tooltip>
			</div>
			<div className='flex items-center'>
				<p className='min-w-[110px] text-center dark:text-white'>Category:</p>
				<Select
					labelPlacement='outside'
					placeholder='Select Category'
					className='w-[160px]'
					selectionMode='single'
					disallowEmptySelection
					defaultSelectedKeys={['1']}>
					{categoryList.map(item => (
						<SelectItem
							key={item.id}
							onPress={() => {
								setSelectCategory(Number.parseInt(item.id));
							}}>
							{item.name}
						</SelectItem>
					))}
				</Select>
			</div>
			<div className='flex items-center'>
				<p className='min-w-[110px] text-center dark:text-white'>Open Time:</p>
				<Input
					type='datetime-local'
					min={dayjs().format('YYYY-MM-DD hh:mm')}
					value={dayjs(openTime).format('YYYY-MM-DDThh:mm')}
					onValueChange={setOpenTime}
					className='w-auto'
				/>
			</div>
			<div className='flex items-start'>
				<p className='min-w-[110px] text-center dark:text-white'>
					Introduction:&nbsp;
				</p>
				<Textarea
					className='max-w-[600px]'
					variant='bordered'
					value={introduction}
					onValueChange={setIntroduction}
				/>
			</div>
			<Button
				className='w-fit self-center'
				onPress={onNextPress}>
				Next
			</Button>
			<UploadModal
				onFinish={onFinish}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				setVideoUploadResult={setVideoUploadResult}
			/>
		</Card>
	);
};

export default function Page() {
	const [selectedKey, setSelectedKey] = useState<string>('AuditList');
	const tabsData = [
		{
			name: 'AuditList',
			component: <AuditTable />,
		},
		{
			name: 'Upload',
			component: <UploadForm setSelectedKey={setSelectedKey} />,
		},
	];

	return (
		<div className='w-full flex flex-col'>
			<Tabs
				className='w-full'
				selectedKey={selectedKey}
				onSelectionChange={key => {
					setSelectedKey(key as string);
				}}
				classNames={{
					tabList:
						'gap-6 w-full relative rounded-none px-10 py-0 border-b border-divider',
					cursor: 'w-full',
					tab: 'max-w-fit px-0 h-12 text-md',
				}}
				variant='underlined'>
				{tabsData.map(item => (
					<Tab
						key={item.name}
						title={item.name}>
						{item.component}
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
