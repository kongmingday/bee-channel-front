import { PageParams } from "@/types";
import { CommitParam, FavoriteParam } from "@/types/media";
import { del, get, post } from "@/utils/common/fetchUtil";

const serviceName = process.env.NEXT_PUBLIC_MEDIA_SERVICE

export const getCategoryList = () => {
  return get(`/${serviceName}/category`)
}

export const getModuleRecommend = (categoryId: string) => {
  return get(`/${serviceName}/video`, { categoryId })
}

export const getVideoInfo = (videoId: string) => {
  return get(`/${serviceName}/video/${videoId}`)
}


export const getCommentPage = (videoId: string, pageNo: number, pageSize: number, orderBy: number) => {
  return get(`/${serviceName}/comment/${videoId}`, { pageNo, pageSize, orderBy })
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