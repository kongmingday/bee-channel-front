'use client';
import { getCategoryList, getModuleRecommend } from '@/api/media';
import { ChipModule, MediaCardModule } from '@/components/media/mediaAssembly';
import { ModuleCategory } from '@/types/enum';
import { Category } from '@/types/media';
import { useEffect, useState } from 'react';

export default function Page() {
	const [categoryList, setCategoryList] = useState<Category[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			await getCategoryList().then(res => {
				setCategoryList(res.result);
			});
		};
		fetchData();
	}, []);
	return (
		<>
			{/* <ChipModule chipList={categoryList} /> */}
			<MediaCardModule
				key={ModuleCategory.RECOMMEND}
				recommend
			/>
			{categoryList?.map((item, index) => (
				<MediaCardModule
					key={item.id}
					module={item}
				/>
			))}
		</>
	);
}
