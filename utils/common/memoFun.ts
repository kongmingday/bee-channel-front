import { MediaType } from '@/types/enum';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const calculateDuration = (targetTime: string) => {
	dayjs.extend(relativeTime);
	return dayjs(targetTime).fromNow();
};

export const pushVideo = (videoId: string, router: AppRouterInstance) => {
	router.push(`/watch?id=${videoId}&type=${MediaType.VIDEO}`);
};

export const pushLive = (liveId: string, router: AppRouterInstance) => {
	router.push(`/watch?id=${liveId}&type=${MediaType.LIVE}`);
};
