export enum SignInType {
	EMAIL = 'Email',
	PASSWORD = 'Password',
	WECHAT = 'WeChat',
}

export enum MediaType {
	LIVE = 'live',
	VIDEO = 'video',
}

export enum MediaSourceType {
	VIDEO = 'video/mp4',
	RMTP = 'rtmp/flv',
	HTTP_FLV = 'flv',
}

export enum DeriveType {
	VIDEO = 0,
	DYNAMIC = 1,
	COMMENT = 2,
}

export enum FavoriteType {
	UNLIKE = 0,
	LIKE = 1,
}

export enum OrderType {
	HOT = 0,
	TIME = 1,
}

export enum AuditStatusType {
	WAITING = 0,
	UNAPPROVED = 1,
	APPROVED = 2,
}

export enum PayType {
	ALIPAY = 0,
}

export enum ModuleCategory {
	HISTORY = '-1',
	WATCH_LATER = '-2',
	LIKED = '-4',
	RECOMMEND = 'recommend',
}
