/*
 * @Author: err0r
 * @Date: 2023-10-14 17:22:53
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-22 08:31:39
 * @Description: 
 * @FilePath: \bee-channel-front\app\library\page.tsx
 */
import { Metadata } from "next";
import { MediaCardModule } from '@/components/media/mediaAssembly'
import { HistoryIcon, LaterIcon, PlaylistIcon, FavoriteIcon } from "@/components/common/icons";
import { ReactNode } from "react";

const TitleTemplate = (
	props: {
		icon: ReactNode
		title: string
	}
) => {
	return (
		<div className="flex">
			{props.icon}
			<h1 className="text-xl mb-4 ml-2">{props.title}</h1>
		</div>
	)
}

export default function Page() {
	const resData = [1, 2, 3, 4]
	const moduleMap = [
		{
			title: "History",
			icon: <HistoryIcon />,
			mediaList: [1, 2, 3, 4]
		}, {
			title: "Watch Later",
			icon: <LaterIcon />,
			mediaList: [1, 2, 3, 4]
		}, {
			title: "Playlists",
			icon: <PlaylistIcon />,
			mediaList: [1, 2, 3, 4]
		}, {
			title: "Liked",
			icon: <FavoriteIcon />,
			mediaList: [1, 2, 3, 4]
		}
	]
	return (
		<>
			{
				moduleMap.map(item =>
					<MediaCardModule key={item.title}
						mediaList={item.mediaList}
						grid="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
						slot={
							<TitleTemplate
								title={item.title}
								icon={item.icon}
							/>
						}
					/>
				)
			}
		</>
	);
}
