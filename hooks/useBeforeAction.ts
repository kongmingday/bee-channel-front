import { getAuthInfo } from "@/utils/common/tokenUtils"

export const useBeforeAction = (
  action: () => void,
  before?: () => boolean
): boolean => {
  
  if (!before) {
    const authInfo = getAuthInfo()
    return authInfo !== null
  } else {
    const flag = before()
    if (!flag) {
      return false
    }
  }

  action()
  return true
}