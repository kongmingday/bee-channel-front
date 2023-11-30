import { UserInfo } from "./auth"

export type Category = {
  id: string
  name: string
}

export type SimpleVideo = {
  id: string
  authorId: string
  title: string
  introduction: string
  tag: string
  categoryId: number
  coverPath: string
  savePath: string
  liked: number
  unliked: number
  publicTime: string
  sawTime: string
  clickedCount: string
  user: UserInfo
}

export type Video = SimpleVideo & {
  saveId?: string
  coverId?: string
  status?: number
  upTime?: string
}