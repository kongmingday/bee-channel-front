import { get } from "@/utils/common/fetchUtil";

const serviceName = 'user'

export const subscribeActoin = (userToId: string) => {
  return get(`/${serviceName}/info/subscribe/${userToId}`)
}