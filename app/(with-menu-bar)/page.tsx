/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-20 17:18:24
 * @Description: 
 * @FilePath: \bee-channel-front\app\page.tsx
 */
"use client"
import { getCategoryList, getModuleRecommend } from '@/api/media';
import { ChipModule, MediaCardModule } from '@/components/media/mediaAssembly'
import { Category } from '@/types/media';
import { useEffect, useState } from 'react';

export default function Page() {

	const [categoryList, setCategoryList] = useState<Category[]>([])
	useEffect(() => {
		const fetchData = async () => {
			await getCategoryList().then((res) => {
				setCategoryList(res.result)
			})
		}
		fetchData()
	}, [])
	return (
		<>
			<ChipModule chipList={categoryList} />
			{
				categoryList?.map((item, index) =>
					<MediaCardModule key={item.id} module={item} />
				)
			}
		</>
	);
}
