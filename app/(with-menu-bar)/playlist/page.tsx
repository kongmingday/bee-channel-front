'use client'

import {
	getPlayList,
	getVideoByPlayListId,
	buildPlayList as buildPlayListApi,
	updatePlayList,
	deletePlayList,
	deleteFromPlayList,
} from '@/api/media'
import { Card, CardBody } from '@nextui-org/react'
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/dropdown'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { Pagination } from '@nextui-org/pagination'
import { Button } from '@nextui-org/button'
import { useEffect, useState } from 'react'
import { AddIcon, MenuIcon } from '@/components/common/icons'
import { PlayList, SimpleMedia } from '@/types/media'
import clsx from 'clsx'
import { SimpleParams } from '@/types'
import { EmptyData, MediaCardGrid } from '@/components/media/mediaAssembly'

enum OptionAction {
	NEW = 0,
	DELETE = 1,
	RENAME = 2,
}

export default function Page() {
	const modalTemplate = [
		<ModalContent key={0}>
			{(onClose) => (
				<>
					<ModalHeader className='flex flex-col gap-1'>
						New PlayList?
					</ModalHeader>
					<ModalBody>
						<Input
							value={newName}
							onValueChange={setNewName}
							label='PlayList Name'
							labelPlacement='outside-left'
							className='w-full flex justify-center'
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							color='danger'
							variant='light'
							onPress={onClose}>
							Cancel
						</Button>
						<Button
							color='primary'
							onPress={buildPlayList}>
							Ok
						</Button>
					</ModalFooter>
				</>
			)}
		</ModalContent>,
		<ModalContent key={1}>
			{(onClose) => (
				<>
					<ModalHeader className='flex flex-col gap-1'>
						Delete PlayList
					</ModalHeader>
					<ModalBody>Are you sure?</ModalBody>
					<ModalFooter>
						<Button
							color='danger'
							variant='light'
							onPress={onClose}>
							Cancel
						</Button>
						<Button
							color='primary'
							onPress={removePlayList}>
							Ok
						</Button>
					</ModalFooter>
				</>
			)}
		</ModalContent>,
		<ModalContent key={2}>
			{(onClose) => (
				<>
					<ModalHeader className='flex flex-col gap-1'>
						Rename PlayList
					</ModalHeader>
					<ModalBody>
						<Input
							value={newName}
							onValueChange={setNewName}
							label='New Name'
							labelPlacement='outside-left'
							className='w-full flex justify-center'
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							color='danger'
							variant='light'
							onPress={onClose}>
							Cancel
						</Button>
						<Button
							color='primary'
							onPress={renamePlayList}>
							Ok
						</Button>
					</ModalFooter>
				</>
			)}
		</ModalContent>,
	]

	const [playLists, setPlayLists] = useState<PlayList[]>([])
	const [selectKey, setSelectKey] = useState<number>(0)
	const [mediaList, setMediaList] = useState<SimpleMedia[]>([])
	const [pageParams, setPageParams] = useState<SimpleParams>({
		pageSize: 9,
		total: 0,
	})
	const [target, setTarget] = useState<number>(0)
	const [pageNo, setPageNo] = useState<number>(1)
	const [action, setAction] = useState<OptionAction>(OptionAction.NEW)
	const [newName, setNewName] = useState<string>('')
	const [isOpen, setOpenState] = useState<boolean>()
	const openModal = (optionAction: OptionAction) => {
		setAction(optionAction)
		setOpenState(true)
	}

	const buildPlayList = async () => {
		const { result } = await buildPlayListApi(newName)
		result && fetchPlayList()
		setOpenState(false)
	}

	const renamePlayList = async () => {
		const { result } = await updatePlayList(playLists[target].id, newName)
		result && fetchPlayList()
		setOpenState(false)
	}

	const removePlayList = async () => {
		const { result } = await deletePlayList(playLists[target].id)
		result && fetchPlayList()
		setOpenState(false)
	}

	const fetchPlayListVideo = async (playListId: string) => {
		await getVideoByPlayListId(playListId)?.then((res) => {
			if (res.result.total !== 0) {
				setMediaList(res.result.data)
			} else {
				setMediaList([])
			}
			setPageParams((pre) => ({ ...pre, total: res.result.total }))
		})
	}

	const fetchPlayList = async () => {
		await getPlayList()?.then((response) => {
			if (!response) {
				return
			}
			const { result } = response
			setPlayLists(result)
		})
	}

	const removeFromPlayList = async (videoId: string) => {
		const { result } = await deleteFromPlayList(
			playLists[selectKey].id,
			videoId,
		)
		result && fetchPlayListVideo(playLists[selectKey].id)
	}

	useEffect(() => {
		fetchPlayList()
	}, [])

	useEffect(() => {
		if (playLists && playLists.length > 0) {
			fetchPlayListVideo(playLists[selectKey].id)
		}
	}, [playLists, selectKey])

	return (
		<>
			<Card className='w-full h-[600px] min-w-[800px] dark:shadow-none border-2 dark:border-zinc-700'>
				<CardBody className='flex h-full flex-row p-0'>
					<div className='h-full border-r-2 flex flex-col dark:border-zinc-700'>
						<div className='py-2 border-b-2 w-[200px] flex justify-between items-center px-4 dark:border-zinc-700'>
							<div className='text-center text-current '>Your Play List</div>
							<Button
								variant='light'
								isIconOnly
								size='sm'>
								<AddIcon
									size={25}
									onClick={() => {
										openModal(OptionAction.NEW)
									}}
								/>
							</Button>
						</div>
						<div className='flex-1 overflow-y-auto scrollbar'>
							{playLists.length > 0 ? (
								playLists.map((item, index) => (
									<div
										key={index}
										onClick={() => {
											setSelectKey(index)
										}}
										className={clsx(
											'flex justify-between items-center py-2 px-4',
											{ 'bg-default-200': selectKey === index },
											{ 'hover:bg-default-100': selectKey !== index },
										)}>
										<div>{item.name}</div>
										{item.name !== 'Watch Later' && (
											<Dropdown>
												<DropdownTrigger>
													<Button
														variant='light'
														isIconOnly
														size='sm'>
														<MenuIcon />
													</Button>
												</DropdownTrigger>
												<DropdownMenu aria-label='Static Actions'>
													<DropdownItem
														key='rename'
														onClick={() => {
															setTarget(index)
															openModal(OptionAction.RENAME)
														}}>
														Rename
													</DropdownItem>
													<DropdownItem
														key='delete'
														className='text-danger'
														color='danger'
														onClick={() => {
															setTarget(index)
															openModal(OptionAction.DELETE)
														}}>
														Delete
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										)}
									</div>
								))
							) : (
								<EmptyData />
							)}
						</div>
					</div>
					<div className='h-full py-2 px-4 flex flex-col justify-between overflow-y-auto scrollbar w-full'>
						{mediaList.length > 0 ? (
							<MediaCardGrid
								grid='grid-cols-4'
								mediaList={mediaList}
								removeFromPlayList={removeFromPlayList}
							/>
						) : (
							<EmptyData />
						)}
						{pageParams.total !== 0 && (
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
						)}
					</div>
				</CardBody>
			</Card>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setOpenState(false)
				}}>
				{modalTemplate[action]}
			</Modal>
		</>
	)
}
