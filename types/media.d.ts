import { PageParams } from "."
import { FullUser, UserInfo } from "./auth"
import { FavoriteType } from "./enum"

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
  likeCount: number
  unlikeCount: number
  publicTime: string
  sawTime: string
  clickedCount: string
  author: FullUser
  commentCount?: number
  favoriteType?: number // 0-unliked 1-liked undefined-no react
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
  fromUser: UserInfo
  toUser: UserInfo
  createTime: string
  content: string
  childrenCount: number
  children?: Comment[]
  likeCount: number
  unlikeCount: number
  favoriteType?: number
}

export type ChildrenComment = {
  isLoading: boolean
  data: Comment[]
}

export type ChildrenPlugin = {
  [key: string]: ChildrenComment
}

export type ChildrenOpenTree = {
  [key: string]: boolean
}

export type FavoriteParam = {
  sourceId: string
  deriveType: number
  favoriteType: FavoriteType
  userToId?: string
}


export type CommitParam = {
  deriveId: string
  deriveType: DeriveType
  content: string
  userToId?: string
  parentId?: strinng
}