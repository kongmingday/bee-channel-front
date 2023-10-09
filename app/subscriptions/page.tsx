import { Metadata } from "next";
import { MediaCardList } from '@/components/media/mediaAssembly'

export const metadata: Metadata = {
  title: 'Subscriptions'
}

export default function Page() {
  const resData = [1, 2, 3, 4]
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <MediaCardList mediaList={resData} />
      </div>
    </>
  );
}
