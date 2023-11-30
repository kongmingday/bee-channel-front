import { AuthInfo, JwtPayloadExt } from "@/types/auth"
import { jwtDecode } from "jwt-decode"

export const AUTH_INFO = 'AUTH_INFO'
export const AUTH_TOKEN = 'AUTH_TOKEN'

const setAuthInfo = (
  value: any
) => {
  localStorage.setItem(AUTH_INFO, JSON.stringify(value))
}

export const getAuthInfo = (): AuthInfo => {
  return JSON.parse(localStorage.getItem(AUTH_INFO) || '')
}

export const removeAuthInfo = () => {
  localStorage.removeItem(AUTH_INFO)
}

export const setAuthToken = (
  value: string
) => {
  const user: JwtPayloadExt = jwtDecode(value)
  const userInfo = {
    authorities: user.authorities,
    information: JSON.parse(user.user_name || '')
  }
  setAuthInfo(userInfo)
  localStorage.setItem(AUTH_TOKEN, `Bearer ${value}`)
}

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN)
}

export const removeAuthToken = () => {
  removeAuthInfo()
  localStorage.removeItem(AUTH_TOKEN)
}


export const setToken = (
  key: string,
  value: any
) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getToken = (
  key: string
) => {
  return localStorage.getItem(key)
}

export const removeToken = (
  key: string
) => {
  localStorage.removeItem(key)
}