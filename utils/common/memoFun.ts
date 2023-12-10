import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const calculateDuration = (targetTime: string) => {
  dayjs.extend(relativeTime)
  return dayjs(targetTime).fromNow()
}