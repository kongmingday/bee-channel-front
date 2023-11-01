/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-20 17:18:24
 * @Description: 
 * @FilePath: \bee-channel-front\app\page.tsx
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
