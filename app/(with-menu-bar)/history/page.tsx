"use client";
import { useEffect, useState } from "react";
import { SimpleParams, TimePoint } from "@/types";
import { MediaScrollList } from "@/components/media/mediaAssembly";
import { getHistoryVideoPage } from "@/api/media";
import { HistoryVideo } from "@/types/media";
import dayjs from "dayjs";

export default function Page() {
  const [historyList, setHistoryList] = useState<HistoryVideo[]>([]);
  const [pageParams, setPageParams] = useState<SimpleParams>({
    pageSize: 6,
    total: 0,
  });
  const [pageNo, setPageNo] = useState<number>(1);
  const [pointList, setPointList] = useState<TimePoint[]>([]);

  const fetchData = async () => {
    const { result } = await getHistoryVideoPage({
      pageNo,
      pageSize: pageParams.pageSize,
    });

    const tempPointList: TimePoint[] = [];

    result.data.forEach((item: HistoryVideo, index: number) => {
      const dateFormat = dayjs(item.updateTime).format("YYYY-MM-DD");
      if (!tempPointList.find((element) => element.point === dateFormat)) {
        tempPointList.push({ point: dateFormat, index });
      }
    });

    setPointList(tempPointList);
    setHistoryList((pre) => [...pre, ...result.data]);
    setPageParams((pre) => ({ ...pre, total: result.total }));
    setPageNo((pre) => pre + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap w-full lg:w-[90%]">
          <MediaScrollList
            isHistory
            pointList={pointList}
            mediaList={historyList}
            pageProcess={{
              allPageParams: { pageParams, setPageParams, pageNo, setPageNo },
              loadMore: fetchData,
            }}
          />
        </div>
      </div>
    </>
  );
}
