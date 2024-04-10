'use client';

import {
	Button,
	Spacer,
	Spinner,
	CardBody,
	Card,
	Input,
	Image,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	CardHeader,
	Textarea,
} from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
	applyLicense,
	cancelLicense,
	getPersonalLiveInfo,
	getPersonalLicense,
	updateLiveInfo,
} from '@/api/live';
import { LicenseResult } from '@/types/live';
import { AuditStatusType } from '@/types/enum';
import { Toast, ToastMode } from '@/components/common/toast';
import { PictureIcon } from '@/components/common/icons';
import { FileUploadResult } from '@/types/media';
import { uploadSingleFile } from '@/api/upload';

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST;
const liveHost = process.env.NEXT_PUBLIC_LIVE_HOST;

const LiveInfoBox = (props: { liveId: string }) => {
	const [title, setTitle] = useState<string>('');
	const [introduction, setIntroduction] = useState<string>('');
	const uploadRef = useRef<HTMLInputElement>(null);
	const [coverUploadResult, setCoverUploadResult] = useState<FileUploadResult>(
		{},
	);
	const [liveInfoId, setLiveInfoId] = useState<string>('');

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

	const handleLiveInfoUpdate = async () => {
		if (
			!coverUploadResult.filePath ||
			!title ||
			title.length <= 0 ||
			introduction.length > 50
		) {
			Toast('please check the live information', ToastMode.DANGER);
			return;
		}

		await updateLiveInfo({
			id: liveInfoId,
			title,
			introduction,
			liveId: props.liveId,
			coverPath: coverUploadResult.filePath,
		}).then(res => {
			if (res.code === 200) {
				Toast('the live info has succeed', ToastMode.SUCCESS);
			}
		});
	};

	const fetchLiveInfo = () => {
		getPersonalLiveInfo(props.liveId).then(res => {
			const liveInfo = res.result;
			if (res.code === 200 && liveInfo) {
				setTitle(liveInfo.title);
				setIntroduction(liveInfo.introduction);
				setCoverUploadResult({ filePath: liveInfo.coverPath });
				setLiveInfoId(liveInfo.id);
			}
		});
	};

	useEffect(() => {
		fetchLiveInfo();
	}, []);

	return (
		<Card shadow='sm'>
			<CardBody className='flex gap-6'>
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
				<div className='flex items-start'>
					<p className='min-w-[110px] text-center dark:text-white'>
						Introduction:&nbsp;
					</p>
					<Textarea
						className='max-w-[600px]'
						isInvalid={introduction.length > 100}
						variant='bordered'
						value={introduction}
						onValueChange={setIntroduction}
					/>
				</div>
				<Button
					color='primary'
					className='w-fit self-center'
					onPress={handleLiveInfoUpdate}>
					Update
				</Button>
			</CardBody>
		</Card>
	);
};

export default function Page() {
	const [liveLicense, setLiveLicense] = useState<LicenseResult[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchLicense = async () => {
		setIsLoading(true);
		await getPersonalLicense().then(res => {
			if (res.code === 200) {
				setLiveLicense([res.result]);
			}
		});
		setIsLoading(false);
	};

	const handleApply = async () => {
		await applyLicense().then(res => {
			if (res.code === 200) {
				fetchLicense();
			} else {
				Toast('the license apply has error');
			}
		});
	};

	const handleCanel = async () => {
		await cancelLicense().then(res => {
			if (res.code === 200) {
				fetchLicense();
			} else {
				Toast('the license cancel has error');
			}
		});
	};

	useEffect(() => {
		fetchLicense();
	}, []);

	return (
		<div className='w-full flex flex-col gap-8'>
			<Card shadow='sm'>
				<CardBody>
					<p>
						If you want to publish by livestream, please use the token template
					</p>{' '}
					<Spacer />
					<p>
						Template:{' '}
						{`${liveHost}/Your License Key?secret=Your License Secret`}
					</p>{' '}
					<Spacer />
					<div className='flex gap-4'>
						<p>OBS:</p>
						<div>
							<p>Server: {`${liveHost}/`}</p>
							<p>Strean Key: Your License Key?secret=Your License Secret</p>
						</div>
					</div>
					<p>Like: {`${liveHost}/123?secret=123`}</p>
					<Spacer />
				</CardBody>
			</Card>
			<Table
				aria-label='Example static collection table'
				fullWidth
				classNames={{
					table: 'min-h-[100px]',
					emptyWrapper: 'h-full',
				}}>
				<TableHeader>
					<TableColumn align='center'>License Key</TableColumn>
					<TableColumn align='center'>License Secret</TableColumn>
					<TableColumn align='center'>Status</TableColumn>
					<TableColumn align='center'>Grant Date</TableColumn>
					<TableColumn align='center'>Reason</TableColumn>
					<TableColumn align='center'>Action</TableColumn>
				</TableHeader>
				<TableBody
					items={liveLicense}
					isLoading={isLoading}
					loadingContent={
						<Spinner
							color='warning'
							className='mt-12'
						/>
					}
					emptyContent={
						<Button
							color='primary'
							onPress={handleApply}>
							Apply License
						</Button>
					}>
					{item => (
						<TableRow key='0'>
							<TableCell>{item?.live?.liveKey || 'No Data'}</TableCell>
							<TableCell>{item?.live?.liveSecret || 'No Data'}</TableCell>
							<TableCell>
								{item?.superviseLicense
									? AuditStatusType[item?.superviseLicense.status]
									: 'No Apply'}
							</TableCell>
							<TableCell>
								{item?.superviseLicense?.superviseTime || 'No Data'}
							</TableCell>
							<TableCell>
								{item?.superviseLicense?.reason || 'No Data'}
							</TableCell>
							<TableCell>
								{!item?.superviseLicense ||
								item?.superviseLicense.status === AuditStatusType.UNAPPROVED ? (
									<Button
										color='primary'
										onPress={handleApply}>
										Apply
									</Button>
								) : (
									<Button
										color='primary'
										onPress={handleCanel}>
										Cancel
									</Button>
								)}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{liveLicense.length > 0 && liveLicense[0].live && (
				<LiveInfoBox liveId={liveLicense[0].live?.id} />
			)}
		</div>
	);
}
