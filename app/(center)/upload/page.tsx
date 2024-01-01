"use client";
import { ClockIcon, FailedIcon, OkIcon, PictureIcon, VideoIcon } from "@/components/common/icons";
import { AuditVideo, Category } from "@/types/media";
import { getAuthInfo } from "@/utils/common/tokenUtils";
import {
	Tabs, Tab, Button, Textarea, Image,
	Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter,
	Input, Card, Select, SelectItem, CardBody, Chip, Pagination
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { PageParams, PageParamsExt, SimpleParams, StoreFileHost } from "@/types";
import { getCategoryList, getPersonalVideoList } from "@/api/media";
import { AuditStatusType } from "@/types/enum";
import { handleUpload } from "@/utils/common/fileUpload";

const AuditStatusIcon = (
	props: {
		status: AuditStatusType
	}
) => {
	if (props.status === AuditStatusType.WAITED) {
		return (
			<><ClockIcon size={25} />Waited</>
		)
	} else if (props.status === AuditStatusType.APPROVED) {
		return (
			<><OkIcon size={25} />Approved</>
		)
	} else if (props.status === AuditStatusType.UNAPPROVED) {
		return (
			<><FailedIcon size={25} />Unapproved</>
		)
	}
}

const AuditTable = () => {

	const [auditList, setAuditList] = useState<AuditVideo[]>([])
	const [simpleParams, setSimpleParams] = useState<SimpleParams>({
		pageSize: 6,
		total: 0
	})

	const fetchData = async (pageNo?: number) => {
		const { result } = await getPersonalVideoList(
			pageNo || 0,
			simpleParams.pageSize
		)
		setAuditList(result.data)
		setSimpleParams(pre => {
			return {
				...pre,
				total: result.total
			}
		})
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="flex flex-col gap-5">
			{
				auditList.map(item =>
					<Card key={item.id}>
						<CardBody>
							<div className="flex gap-8">
								<Image
									alt="video cover"
									className="w-[300px]"
									src={`${StoreFileHost}${item.coverPath}`} />
								<div className="flex flex-col gap-2 w-full">
									<div className="flex justify-between items-end">
										<p className="text-xl line-clamp-1 text-ellipsis">{item.title}</p>
										<p className="text-xl line-clamp-1 text-ellipsis">{item.upTime}</p>
									</div>
									<div className="flex gap-1 items-end text-lg">
										<AuditStatusIcon status={item.supervise.status} />
									</div>
									{
										item.supervise?.status === AuditStatusType.UNAPPROVED &&
										<Textarea
											isReadOnly
											variant="flat"
											label="Unapproved reason"
											labelPlacement="inside"
											minRows={1}
											className="col-span-12 md:col-span-6 mb-6 md:mb-0 cursor-pointer"
											value={item.supervise.reason}
										/>
									}
									<div className="flex items-end gap-6 grow">
										{
											item.supervise &&

											<div>
												<Chip radius="sm" color="primary" className="mr-2">Audit Time</Chip>
												<span>{item.supervise.superviseTime}</span>
											</div>
										}
										<div>
											<Chip radius="sm" color="primary" className="mr-2">Publish Time</Chip>
											<span>{item.publicTime}</span>
										</div>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				)
			}
			<Pagination
				className="w-full flex justify-center mt-5"
				classNames={{
					cursor: "shadow-md bg-stone-200 dark:bg-primary"
				}}
				total={Math.ceil(simpleParams.total / simpleParams.pageSize)}
				onChange={(page: number) => {
					fetchData(page)
				}}
				initialPage={1} />
		</div>
	)
}


const UploadModal = (
	props: {
		isOpen: boolean,
		onOpenChange: () => void,
	}
) => {

	const uploadRef = useRef<HTMLInputElement>(null);

	return (
		<Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
			<ModalContent>
				{(onClose) =>
					<>
						<ModalHeader className="flex flex-col gap-1">Upload Video</ModalHeader>
						<ModalBody>
							<Button
								color="primary"
								className="h-48 dark:text-white"
								onPress={() => { uploadRef.current?.click() }}
								startContent={<VideoIcon className="mr-2" />}>
								Select Native Video
							</Button>
							<input type="file" className="hidden" accept=".mp4" ref={uploadRef} />
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onPress={() => { handleUpload(uploadRef.current!) }}>Upload</Button>
							<Button color="primary">Finish</Button>
						</ModalFooter>
					</>
				}
			</ModalContent>
		</Modal>
	)
}

const UploadForm = () => {

	const uploadRef = useRef<HTMLInputElement>(null)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [selectCategory, setSelectCategory] = useState<number | undefined>()
	const [categoryList, setCategoryList] = useState<Category[]>([])
	const [show, setShow] = useState<boolean>(false)
	const [openTime, setOpenTime] = useState<string>()

	useEffect(() => {
		const fetchCategory = async () => {
			const { result } = await getCategoryList()
			setCategoryList(result)
		}
		fetchCategory()
	}, [])

	return (
		<Card className="flex flex-col gap-8 p-5 overflow-visible">
			<div className="flex items-center">
				<p className="min-w-[110px] text-center dark:text-white">Title:&nbsp;</p>
				<Input
					variant="underlined"
					className="w-auto"
					classNames={{
						inputWrapper: 'py-0'
					}} />
			</div>
			<div className="flex items-start">
				<p className="min-w-[110px] text-center dark:text-white">Cover:&nbsp;</p>
				<Button
					color="primary"
					className="h-20 dark:text-white"
					onPress={() => { uploadRef.current?.click() }}
					startContent={<PictureIcon className="mr-2" />}>
					Select Native Picture
				</Button>
				<input type="file" className="hidden" accept=".png, .jpg, .jpeg" ref={uploadRef} />
			</div>
			<div className="flex items-center">
				<p className="min-w-[110px] text-center dark:text-white" >Category:</p>
				<Select
					labelPlacement='outside'
					placeholder="Select Category"
					className="w-[160px]"
					selectionMode="single"
				>
					{
						categoryList.map((item, index) =>
							<SelectItem
								key={item.id}
								onPress={() => {
									setSelectCategory(Number.parseInt(item.id))
								}}>
								{item.name}
							</SelectItem>
						)
					}
				</Select>
			</div>
			<div className="flex items-center">
				<p className="min-w-[110px] text-center dark:text-white" >Open Time:</p>
				<Input
					type="datetime-local"
					min={dayjs().format("YYYY-MM-DDThh:mm")}
					value={openTime}
					onChange={(e) => { setOpenTime(e.currentTarget.value) }}
					className="w-auto" />
			</div>
			<div className="flex items-start">
				<p className="min-w-[110px] text-center dark:text-white">Introduction:&nbsp;</p>
				<Textarea className="max-w-[600px]" />
			</div>
			<Button
				className="w-fit self-center"
				onPress={() => { onOpen() }}>
				Next
			</Button>
			<UploadModal isOpen={isOpen} onOpenChange={onOpenChange} />
		</Card>
	)
}


export default function Page() {

	const authInfo = getAuthInfo()
	const tabsData = [{
		name: 'AuditList',
		component: <AuditTable />
	}, {
		name: 'Upload',
		component: <UploadForm />
	}]


	return (
		<div className="w-full flex flex-col">
			<Tabs className="w-full"
				classNames={{
					tabList: "gap-6 w-full relative rounded-none px-10 py-0 border-b border-divider",
					cursor: "w-full",
					tab: "max-w-fit px-0 h-12 text-md",
				}}
				variant="underlined">
				{
					tabsData.map(item =>
						<Tab key={item.name} title={item.name}>{item.component}</Tab>
					)
				}
			</Tabs>
		</div>
	);
}
