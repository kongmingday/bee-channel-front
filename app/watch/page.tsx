/*
 * @Author: err0r
 * @Date: 2023-10-20 01:26:09
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-25 00:05:47
 * @Description: 
 * @FilePath: \bee-channel-front\app\watch\page.tsx
 */
'use client'
import { useSearchParams } from 'next/navigation'
import { MediaList } from '@/components/media/mediaAssembly';
import { Button, ButtonGroup, User, Card, CardBody } from '@nextui-org/react';
import { LikeIcon, MoreIcon, ShareIcon, UnlikeIcon } from '@/components/common/icons';
import { ChatComment } from '@/components/media/chatComment';
import { useState } from 'react';
import clsx from 'clsx';

const BriefArea = (
	props: {
		content: string
	}
) => {

	const [briefExpand, setBriefExpand] = useState(false)
	const briefClass = clsx({
		'line-clamp-2': !briefExpand
	})

	return (
		<Card
			shadow='sm'
			isPressable
			className='mb-10'
			onPress={() => setBriefExpand(!briefExpand)}>
			<CardBody>
				<p className={briefClass}>
					{props.content}
				</p>
			</CardBody>
		</Card>
	)
}

export default function Page() {
	const searchParams = useSearchParams()
	const resData = [1, 2, 3, 4, 5]

	return (
		<div className='flex px-4 md:px-12'>
			<div className='flex-col flex-[2_1_0%]'>
				<div className='w-full'>
					<video
						className='w-full'
						controls
					>
						<source src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' />
					</video>
				</div>
				<div className='flex-col'>
					<p className='text-2xl mt-4 mb-1'>Test Title Module</p>
					<div className='flex items-center mb-4'>
						<div className='flex items-center '>
							<User
								className="items-center"
								name="Nick TechWorld with change"
								classNames={{
									name: 'line-clamp-1'
								}}
								description={
									<>
										<div className='mt-1 line-clamp-1'>934K subscribers</div>
									</>
								}
								avatarProps={{
									className: 'flex-none w-[48px] h-[48px] mt-1 mr-1',
									src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
								}}
							/>
							<Button
								radius='full'
								color="primary"
								className='ml-6'>
								Subscribe
							</Button>
						</div>
						<div className='flex flex-1 items-center justify-end mr-4'>
							<ButtonGroup
								color="primary"
								radius='full'
								className='ml-6'>
								<Button><LikeIcon />26K</Button>
								<Button><UnlikeIcon /></Button>
							</ButtonGroup>
							<Button
								color="primary"
								radius='full'
								className='ml-4'>
								<ShareIcon />Share
							</Button>
							<Button
								color="primary"
								radius='full'
								className='ml-4'
								isIconOnly>
								<MoreIcon />
							</Button>
						</div>
					</div>
					<BriefArea content={
						"Make beautiful websites regardless of your design experience. " +
						"Make beautiful websites regardless of your design experience. " +
						"Make beautiful websites regardless of your design experience." +
						"Make beautiful websites regardless of your design experience."
					} />
					<div>
						<ChatComment />
					</div>
				</div>
			</div>
			<div className='flex-[1_1_0%] hidden lg:inline-block'>
				<MediaList mediaList={resData} />
			</div>
		</div>
	);
}
