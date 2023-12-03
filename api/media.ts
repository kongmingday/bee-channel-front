import { Toast, ToastMode } from "@/components/common/toast";
import { post, get } from "@/utils/common/fetchUtil";

const serviceName = 'media'

export const getCategoryList = () => {
  return get(`/${serviceName}/category`)
}

export const getModuleRecommend = (categoryId: string) => {
  return get(`/${serviceName}/video`, { categoryId })
}

export const getVideoInfo = (videoId: string) => {
  return get(`/${serviceName}/video/${videoId}`)
}


export const getCommentPage = (videoId: string, pageNo: number, pageSize: number) => {
  return get(`/${serviceName}/comment/${videoId}`, { pageNo, pageSize })
}
