import { Metadata } from "next";
import { MediaCardModule } from '@/components/media/mediaAssembly'

export const metadata: Metadata = {
	title: 'Live'
}

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
