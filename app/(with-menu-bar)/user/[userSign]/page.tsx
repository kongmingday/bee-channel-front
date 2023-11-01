/*
 * @Author: err0r
 * @Date: 2023-10-30 18:02:03
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-30 20:40:10
 * @Description: 
 * @FilePath: \bee-channel-front\app\user\[userSign]\page.tsx
 */
"use client";
import { Avatar, Image, Button, Tabs, Tab } from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";

export default function Page({
	params
}: {
	params: {
		userSign: string
	}
}) {
	const briefImage = false
	const [briefState, setBriefState] = useState(false)
	const briefClass = clsx(
		"cursor-default",
		{
			'line-clamp-2': briefState
		}
	)

	const resData = [
		"Home", "Videos", "Playlists", "Community", "Channel"
	]
	return (
		<div className="flex flex-col gap-4 ">
			<div className="px-20">
				{
					briefImage && <Image
						removeWrapper
						className="w-full h-[150px] object-cover mb-4"
						alt="Above Brief Image"
						src="https://nextui-docs-v2.vercel.app/images/album-cover.png" />
				}
				<div className="flex gap-6 ">
					<Avatar className="flex-none w-20 h-20" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
					<div className="flex flex-col gap-1">
						<div className="text-2xl">Auhor Name</div>
						<div className="text-default-500">{`70.7K subscriber · 12 videos`}</div>
						<p className={briefClass}
							onClick={() => { setBriefState(state => !state) }}
						>
							This is a test Brief Module
							This is a test Brief Module
							This is a test Brief Module
							This is a test Brief Module
						</p>
						<Button
							className="mt-2 w-20"
							radius="full"
							color="primary" >
							Subscribe
						</Button>
					</div>
				</div>
			</div>
			<div className="w-full">
				<Tabs className="w-full"
					classNames={{
						tabList: "gap-6 w-full relative rounded-none px-20 py-0 border-b border-divider",
						cursor: "w-full",
						tab: "max-w-fit px-0 h-12 text-md",
					}}
					variant="underlined">
					{resData.map(item =>
						<Tab key={item}>{item}</Tab>
					)}
				</Tabs>
			</div>
		</div>
	);
}
