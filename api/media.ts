import { PageParams, SearchParams } from '@/types'
import {
	AddHistory,
	CommitParam,
	FavoriteParam,
	PlayVideoList,
} from '@/types/media'
import { del, get, post, put } from '@/utils/common/fetchUtil'
import { isExist } from '@/utils/common/tokenUtils'

const serviceName = process.env.NEXT_PUBLIC_MEDIA_SERVICE

export const getCategoryList = () => {
	return get(`/${serviceName}/category`)
}

export const searchVideoList = (data: SearchParams) => {
	return get(`/${serviceName}/video/page`, data)
}

export const getModuleRecommend = (
	categoryId: string,
	pageParams: PageParams,
) => {
	return get(`/${serviceName}/video`, { categoryId, ...pageParams })
}

export const getRecommendByUser = (count?: number) => {
	if (count) {
		return get(`/${serviceName}/video/recommend`, { count })
	}
	return get(`/${serviceName}/video/recommend`)
}

export const getVideoInfo = (videoId: string) => {
	return get(`/${serviceName}/video/${videoId}`)
}

export const getCommentPage = (
	videoId: string,
	pageNo: number,
	pageSize: number,
	orderBy: number,
) => {
	return get(`/${serviceName}/comment/${videoId}`, {
		pageNo,
		pageSize,
		orderBy,
	})
}

export const getChildrenCommen = (parentId: string, pageParams: PageParams) => {
	return get(`/${serviceName}/comment/children/${parentId}`, pageParams)
}

export const favoriteAction = (param: FavoriteParam) => {
	return post(`/${serviceName}/favorite/change`, param)
}

export const deleteComment = (commentId: string) => {
	return del(`/${serviceName}/comment/${commentId}`)
}

export const commitComment = (data: CommitParam) => {
	return post(`/${serviceName}/comment`, data)
}

export const getPersonalVideoList = (pageNo: number, pageSize: number) => {
	return get(`/${serviceName}/video/personal`, { pageNo, pageSize })
}

export const uploadVideo = (data: any) => {
	return post(`/${serviceName}/video/upload`, data)
}

export const getAuthorVideoList = (
	authorId: string,
	pageParams: PageParams,
) => {
	return get(`/${serviceName}/video/personal/${authorId}`, pageParams)
}

export const getSubscriptionVideoList = (pageParams: PageParams) => {
	return get(`/${serviceName}/video/subscription`, pageParams)
}

export const historyProcess = (data: AddHistory) => {
	return post(`/${serviceName}/history`, data)
}

export const getHistoryVideoPage = (pageParams: PageParams) => {
	if (!isExist()) {
		return
	}
	return get(`/${serviceName}/history`, pageParams)
}

export const getLikedVideoPage = (pageParams: PageParams) => {
	if (!isExist()) {
		return
	}
	return get(`/${serviceName}/like`, pageParams)
}

export const getVideoByPlayListId = (playListId: string) => {
	if (!isExist()) {
		return
	}
	return get(`/${serviceName}/playList/${playListId}`)
}

export const getWatchLaterVideoPage = (pageParams: PageParams) => {
	if (!isExist()) {
		return
	}
	return get(`/${serviceName}/playList/later`, pageParams)
}

export const getPlayList = (isWatchLater?: number) => {
	if (!isExist()) {
		return
	}
	return get(`/${serviceName}/playList`, { isWatchLater })
}

export const buildPlayList = (name: string) => {
	return post(`/${serviceName}/playList`, null, { playListName: name })
}

export const updatePlayList = (playListId: string, newName: string) => {
	return put(`/${serviceName}/playList/${playListId}`, { name: newName })
}

export const deletePlayList = (playListId: string) => {
	return del(`/${serviceName}/playList/${playListId}`)
}

export const deleteFromPlayList = (playListId: string, videoId: string) => {
	return del(`/${serviceName}/playList/${playListId}/${videoId}`)
}

export const addToPlayList = (videoId: string, playListIdList: string[]) => {
	return post(`/${serviceName}/playList/batch/${videoId}`, playListIdList)
}

export const getVideoInPlayList = (videoId: string) => {
	return get(`/${serviceName}/playList/inPlayList/${videoId}`)
}

export const updateVideoInPlayList = (
	videoId: string,
	playVideoList: Partial<PlayVideoList>[],
) => {
	return put(`/${serviceName}/playList/inPlayList/${videoId}`, playVideoList)
}
