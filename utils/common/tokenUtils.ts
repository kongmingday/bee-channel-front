import { getUserInfo } from "@/api/user"
import { AuthInfo, JwtPayloadExt } from "@/types/auth"
import { jwtDecode } from "jwt-decode"

export const AUTH_INFO = 'AUTH_INFO'
export const AUTH_TOKEN = 'AUTH_TOKEN'

export const setAuthInfo = (
  value: any
) => {
  setToken(AUTH_INFO, value)
}

export const setUserInfo = (
  information: any
) => {
  const authInfo = getAuthInfo()
  setToken(AUTH_INFO, {
    ...authInfo,
    information
  })
}

export const getCurrentUserId = () => {
  const info = getAuthInfoLocal()
  return info?.information?.id
}

export const getAuthInfoLocal = (): AuthInfo | null => {
  const authToken = getAuthToken()
  if (!authToken) {
    return null
  }

  const authInfo = getToken(AUTH_INFO)
  if (authInfo) {
    return JSON.parse(authInfo)
  }
  return null;
}

export const getAuthInfo = async (): Promise<AuthInfo | null> => {
  const authToken = getAuthToken()
  if (!authToken) {
    return null
  }

  const authInfo = getToken(AUTH_INFO)
  if (authInfo) {
    return JSON.parse(authInfo)
  }
  await getUserInfo()
  return JSON.parse(getToken(AUTH_INFO)!);
}

export const removeAuthInfo = () => {
  removeToken(AUTH_INFO)
}

export const setAuthToken = (
  value: string
) => {
  const user: JwtPayloadExt = jwtDecode(value)
  localStorage?.setItem(AUTH_TOKEN, `Bearer ${value}`)

  getUserInfo().then((res) => {
    if (res.result) {
      const userInfo = {
        authorities: user.authorities,
        information: res.result
      }
      setAuthInfo(userInfo)
    }
  })
}

export const getAuthToken = () => {
  return getToken(AUTH_TOKEN)
}

export const removeAuthToken = () => {
  removeAuthInfo()
  removeToken(AUTH_TOKEN)
}


export const setToken = (
  key: string,
  value: any
) => {
  localStorage?.setItem(key, JSON.stringify(value))
}

export const getToken = (
  key: string
) => {
  return localStorage?.getItem(key)
}

export const removeToken = (
  key: string
) => {
  localStorage?.removeItem(key)
}

export const isExist = () => {
  return getAuthInfo() !== null
}