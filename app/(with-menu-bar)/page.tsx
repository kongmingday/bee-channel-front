'use client';
import { getCategoryList } from '@/api/media';
import { MediaCardModule } from '@/components/media/mediaAssembly';
import { ModuleCategory } from '@/types/enum';
import { Category } from '@/types/media';
import { Button } from '@nextui-org/react';
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
				slot={fetch => {
					return (
						<>
							<h1 className='text-xl mb-4'>Recommend</h1>
							<Button
								onPress={fetch}
								radius='full'
								variant='shadow'
								color='primary'
								size='sm'>
								Refresh
							</Button>
						</>
					);
				}}
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
