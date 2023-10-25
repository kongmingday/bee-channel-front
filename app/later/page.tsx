/*
 * @Author: err0r
 * @Date: 2023-10-18 17:28:08
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-20 22:22:02
 * @Description: 
 * @FilePath: \bee-channel-front\app\later\page.tsx
 */

"use client";
import { PlayIcon, MenuIcon } from "@/components/common/icons";
import {
	Card, CardHeader,
	Listbox, ListboxItem,
	Image, Button, CardBody
} from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function Page() {
	const resData = [1, 2, 3, 4, 5, 6, 7, 8]
	const theme = useTheme()
	return (
		<div className="flex h-full max-h-[640px] w-full flex-col lg:flex-row ">
			<div className='w-full lg:fixed lg:w-[20%] min-w-[350px] lg:h-full'>
				<Card
					isBlurred
					className="items-center border-none w-full lg:h-full"
					shadow="none"
				>
					<Image
						removeWrapper
						alt="Album cover"
						className="object-cover absolute blur-3xl lg:h-[80%] w-full"
						shadow="none"
						src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
					/>
					<CardBody className='w-full flex-row lg:flex-col flex-wrap p-6 z-10'>
						<Image
							removeWrapper
							alt="Album cover"
							className="justify-self-center flex-none object-cover h-44 w-80 lg:w-full mr-5 lg:mr-0"
							shadow="sm"
							src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
						/>
						<div className='mx-2'>
							<h1 className="text-2xl mt-3 mb-2">Title Module</h1>
							<p className="text-md text-foreground-700 mb-1">Product Design</p>
							<p className="text-small text-foreground-600 mb-2">1 video · 2K views · Update 3 years ago</p>
						</div>
						<div className="w-full  mt-8">
							<Button
								radius="full"
								className="w-1/2 lg:w-full text-md bg-white"
							>
								<div className="flex items-center">
									<PlayIcon color="#000000" />
									<p className="text-black">Play All</p>
								</div>
							</Button>
						</div>
					</CardBody>
				</Card>
			</div>
			<Listbox
				className='w-full lg:w-[70%] lg:ml-[360px]'
			>
				{
					resData.map(item =>
						<ListboxItem
							key={item}
							className='h-28 mb-2 p-2'
							startContent={
								<div className='w-full h-full flex justify-between items-center'>
									<div className='flex h-full'>
										<Image
											removeWrapper
											alt="Album cover"
											className="flex-none object-cover w-[11rem] h-full mr-5"
											shadow="none"
											src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
										/>
										<div>
											<p className="text-md line-clamp-2 mb-2">ASMR Chinese Ancient Face Spa Treatment + Scalp Message</p>
											<p className="text-small text-foreground-400 line-clamp-2">Product Design · 2K views · 3 years ago</p>
										</div>
									</div>
									<Button
										variant="light"
										className="items-center"
									>
										<MenuIcon />
									</Button>
								</div>
							}>
						</ListboxItem>
					)
				}
			</Listbox>
		</div>
	);
}
