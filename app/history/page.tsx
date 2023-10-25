/*
 * @Author: err0r
 * @Date: 2023-10-16 17:25:11
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-20 17:16:05
 * @Description: 
 * @FilePath: \bee-channel-front\app\history\page.tsx
 */
import { MediaCardModule } from '@/components/media/mediaAssembly'


export default function Page() {
	const resData = [1, 2, 3, 4]
	return (
		<>
			<MediaCardModule mediaList={resData} />
			<MediaCardModule mediaList={resData} />
			<MediaCardModule mediaList={resData} />
		</>
	);
}
