import { UploadUserInfo } from "@/types/auth";
import { get, formDataPost, put } from "@/utils/common/fetchUtil";
import { getAuthToken, setAuthInfo } from "@/utils/common/tokenUtils";

const serviceName = process.env.NEXT_PUBLIC_USER_SERVICE

export const getUserInfo = async () => {
  const authToken = getAuthToken()
  if (!authToken) {
    return;
  }

  const { result } = await get(`/${serviceName}/info`)
  setAuthInfo(result)
  return get(`/${serviceName}/info`)
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
