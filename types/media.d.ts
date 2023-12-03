import { FullUser, UserInfo } from "./auth"

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
  author: FullUser
  commentCount?: number
}

export type Video = SimpleVideo & {
  saveId?: string
  coverId?: string
  status?: number
  upTime?: string
}

export type VideoSource = {
  src: string
  type: string
}

export type VideoOptions = {
  autoplay: boolean
  controls: boolean
  responsive: boolean
  fluid: boolean
  sources: VideoSource[]
  playbackRates: number[]
  controlBar?: any
}

export type Comment = {
  id: string
  deriveId: string
  userFromId: string
  userToId: string
  createTime: string
  content: string,
  childrenCount: number
}