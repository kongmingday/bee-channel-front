import { SearchParams } from "@/types";
import { UploadUserInfo } from "@/types/auth";
import { get, formDataPost, put } from "@/utils/common/fetchUtil";
import { setAuthInfo, setUserInfo } from "@/utils/common/tokenUtils";

const serviceName = process.env.NEXT_PUBLIC_USER_SERVICE

export const getUserInfo = async () => {
  return await get(`/${serviceName}/info`).then((res) => {
    if (res.code === 200 && res.result) {
      setUserInfo(res.result)
    }
    return res
  })
}

export const getUserFullInfo = (userId: string, currentUserId?: string) => {
  return get(`/${serviceName}/info/full/${userId}`, { currentId: currentUserId })
}

export const searchUserFullInfoList = (data: SearchParams, currentUserId?: string) => {
  return get(`/${serviceName}/info/full/page`, { currentId: currentUserId, ...data })
}

export const uploadUserInfo = (data: UploadUserInfo) => {
  return put(`/${serviceName}/info`, data)
}


export const subscribeActoin = (userToId: string) => {
  return get(`/${serviceName}/info/subscribe/${userToId}`)
}

export const uploadSingleFile = (file: FormData) => {
  return formDataPost(`/${serviceName}/info/upload/avatar`, file)
}
