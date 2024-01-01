export enum SignInType {
  EMAIL = 'Email',
  PASSWORD = 'Password',
  WECHAT = 'WeChat'
}


export enum MediaType {
  LIVE = 'live',
  VIDEO = 'video'
}

export enum MediaSourceType {
  VIDEO = "video/mp4",
  RMTP = "rtmp/flv"
}

export enum DeriveType {
  VIDEO = 0,
  DYNAMIC = 1,
  COMMENT = 2
}

export enum FavoriteType {
  UNLIKE = 0,
  LIKE = 1
}

export enum OrderType {
  HOT = 0,
  TIME = 1
}

export enum AuditStatusType {
  WAITED = 0,
  UNAPPROVED = 1,
  APPROVED = 2
}