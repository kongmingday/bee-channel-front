import { post } from "@/utils/common/fetchUtil";
import { getVerifyCode } from "./checkcode";
import { SetStateAction } from 'react'

const serviceName = 'auth'
const clientId = 'bee_channel'
const secret = 'bee_channel'
const grantType = 'password'

export const fetchCode = async (setCodeSource: (value: SetStateAction<{
  source: string;
  key: string;
}>) => void) => {
  const result = await getVerifyCode()
  setCodeSource({
    source: result.aliasing,
    key: result.key
  })
}


export const login = (
  params: any
) => {
  params = {
    client_id: clientId,
    client_secret: secret,
    grant_type: grantType,
    username: JSON.stringify(params),
  }
  return post(`/${serviceName}/oauth/token`, null, params)
}

export const enable = (
  params: any
) => {
  return post(`/${serviceName}/enable`, null, params)
}

export const signUp = (
  data: any
) => {
  return post(`/${serviceName}/signUp`, data)
}