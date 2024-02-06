"use client"
import { useAppDispatch } from "@/store/hooks"
import { getAuthInfo, getAuthToken } from "@/utils/common/tokenUtils"
import { useEffect, useState } from "react"
import { setWebSocket as setWebSocketGlobal } from "@/store/slices/liveSlice"

const webSocketHost = process.env.NEXT_PUBLIC_WEB_SOCKET_HOST

export const useWebSocket = (
  url: string,
  onOpen: () => any,
  onMessage: (ev: MessageEvent<any>) => any,
  onClose: () => any
) => {
  const [webSocket, setWebSocket] = useState<WebSocket>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const target = new WebSocket(`${webSocketHost}${url}`)
    target.onopen = onOpen
    target.onmessage = onMessage
    target.onclose = onClose
    setWebSocket(target)
    dispatch(setWebSocketGlobal(target))

    return () => {
      webSocket?.close()
    }
  }, [])

  return [webSocket]
}