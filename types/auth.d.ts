import { JwtPayload } from "jwt-decode"
import { RegisterOptions } from "react-hook-form"


export type SignInKeyParams = 'email' | 'password' | 'code'

export type SignUpKeyParams = SignInKeyParams | 'confirm'

export type VerifyParams = {
  key: string
  code: string
}

export type SignUpError = {
  code: 'A1001' | 'A1002' | 'A1003'
  key: SignUpKeyParams
}

export type FormParams = {
  label: string
  type: string
  name: string
  placeholder: string
  error: string
  rule: RegisterOptions
}

export type JwtPayloadExt = JwtPayload & {
  authorities?: string[]
  user_name?: string
}

export type UserInfo = {
  createTime?: Date
  email?: string
  id: string
  phone: string
  status: number
  username: string
  wxUnionId: string
  profile: string
}

export type AllUserInfo = UserInfo & {
  background?: string
  introduction?: string
  birthday?: string
  sex?: number
}

export type AuthInfo = {
  authorities?: string[]
  information?: UserInfo
}