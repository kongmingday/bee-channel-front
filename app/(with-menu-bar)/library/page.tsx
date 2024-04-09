import {
	MediaCardModule,
	TitleTemplate,
} from '@/components/media/mediaAssembly';
import {
	HistoryIcon,
	LaterIcon,
	FavoriteIcon,
} from '@/components/common/icons';
import { ModuleCategory } from '@/types/enum';

export default function Page() {
	const moduleMap = [
		{
			icon: <HistoryIcon />,
			mediaList: [1, 2, 3, 4],
			module: {
				id: ModuleCategory.HISTORY,
				name: 'History',
			},
		},
		{
			icon: <LaterIcon />,
			mediaList: [1, 2, 3, 4],
			module: {
				id: ModuleCategory.WATCH_LATER,
				name: 'Watch Later',
			},
		},
		{
			icon: <FavoriteIcon />,
			mediaList: [1, 2, 3, 4],
			module: {
				id: ModuleCategory.LIKED,
				name: 'Liked',
			},
		},
	];
	return (
		<>
			{moduleMap.map(item => (
				<MediaCardModule
					key={item.module.id}
					module={item.module}
					grid='grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
					slot={
						<TitleTemplate
							title={item.module.name}
							icon={item.icon}
						/>
					}
				/>
			))}
		</>
	);
}
