export type User = {
  username: string;
  userId: string;
  avatar: string;
}

export type Meida = {
  mediaName: string;
  mediaId: string;
  cover: string;
  author: User;
  description: string;
}