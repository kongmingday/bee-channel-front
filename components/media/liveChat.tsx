
"use client";
import {
  Avatar, Button, Textarea, Divider,
  Popover, PopoverContent, PopoverTrigger,
  Card, CardHeader, CardBody, CardFooter, Chip,
} from "@nextui-org/react"
import { useTheme } from "next-themes";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import React, { useRef, useState, Ref, useEffect } from "react";

import { SmileIcon, MoneyIcon } from "../common/icons"
import { useWebSocket } from "@/hooks/useWebSocket";
import { getAuthInfo } from "@/utils/common/tokenUtils";
import { LiveMessage } from "@/types/live";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST

const SuperChat = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-around">
        <picture>
          <img alt="super chat" src="/super_chat_v1.webp" width={100} />
        </picture>
        <div className="flex flex-col justify-center">
          <div className="text-2xl w-full">
            Super Chat
          </div>
          <div className="text-xl w-full">
            Make your message stand out
          </div>
        </div>
      </div>
      <Card className="w-[420px]">
        <CardBody>

        </CardBody>
      </Card>
    </div>
  )
}

const LiveChatInput = (
  props: {
    webSocket?: WebSocket
  }
) => {

  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>()
  const [comment, setComment] = useState('')
  const liveParam = useAppSelector(state => state.live)
  const authInfo = getAuthInfo()

  const handleEmojiChange = (emoji: any) => {
    const current = inputRef.current!
    const position = current.selectionStart!

    if (position == current.value.length) {
      setComment(pre => pre + emoji.native)
      current.focus()
      return;
    }
    const front = current.value.substring(0, position);
    const later = current.value.substring(position);
    setComment(front + emoji.native + later)
    current.focus()
    current.selectionStart = position + emoji.native.length
    current.selectionEnd = position + emoji.native.length
  }

  const handleSendMessage = () => {
    if (comment.length > 50 || comment.trim().length === 0) {
      return;
    }
    const liveMessage = {
      userId: liveParam.userId,
      profile: authInfo?.information?.profile,
      username: authInfo?.information?.username,
      roomId: liveParam.roomId,
      message: comment,
      system: false
    }
    props.webSocket?.send(JSON.stringify(liveMessage))
    setComment('')
  }

  return (
    <div className="flex gap-4 w-full items-center">
      <div className="flex-col flex-1 items-start">
        <Textarea
          minRows={1}
          maxRows={2}
          variant="bordered"
          ref={inputRef as Ref<HTMLInputElement>}
          classNames={{
            label: "hidden",
            input: "scrollbar"
          }}
          placeholder="Only can be 50 letters"
          value={comment}
          onValueChange={setComment}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSendMessage()
            }
          }}
          isInvalid={comment.length > 50}
        />
      </div>
      <Popover
        placement="top-end"
        showArrow={true}>
        <PopoverTrigger>
          <Button size="sm"
            variant="light"
            isIconOnly>
            <SmileIcon size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Picker
            maxFrequentRows={0}
            perLine={12}
            data={data}
            previewConfig={{
              showPreview: false
            }}
            onEmojiSelect={handleEmojiChange}
            theme={theme.resolvedTheme} />
        </PopoverContent>
      </Popover>
      <Popover
        placement="top-end"
        size="lg"
        showArrow={true}>
        <PopoverTrigger>
          <Button size="sm"
            variant="light"
            isIconOnly>
            <MoneyIcon size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <SuperChat />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export const LiveChat = () => {
  const [hideState, setHideState] = useState(false)
  const [autoScroll, setAutoScroll] = useState<boolean>(true)
  const liveParam = useAppSelector(state => state.live)
  const [omissionCount, setOmissionCount] = useState(0)
  const router = useRouter()
  const [messageHistory, setMessageHistory] = useState<LiveMessage[]>([])

  const goToUserIndex = (userId: string) => {
    router.push(`/user/${userId}`)
  }

  const handleOnMessage = (event: MessageEvent<any>) => {
    const message: LiveMessage = JSON.parse(event.data)
    if (message.system) {
      return;
    }
    setMessageHistory(pre => {
      return [...pre, message]
    })
  }

  const [webSocket] = useWebSocket(
    `/${liveParam.roomId}/${liveParam.userId}`,
    () => { },
    handleOnMessage,
    () => { }
  )

  useEffect(() => {
    const containerBox = document.querySelector('.message-container') as HTMLDivElement

    if (!containerBox) {
      return;
    }

    const handleOnScroll = () => {
      const isInBottom = containerBox.scrollHeight === Math.ceil(containerBox.scrollTop) + containerBox.clientHeight
      if (isInBottom) {
        setOmissionCount(0)
      }
      setAutoScroll(isInBottom)
    }

    containerBox.addEventListener('scroll', handleOnScroll)

    return () => {
      containerBox.removeEventListener('scroll', handleOnScroll)
    }
  }, [])

  useEffect(() => {
    if (autoScroll) {
      const containerBox = document.querySelector('.message-container')
      if (containerBox) {
        containerBox.scrollTop = containerBox.scrollHeight
      }
    } else {
      setOmissionCount(pre => pre + 1)
    }
  }, [messageHistory])

  return (
    <Card className="mb-6 dark:shadow-white-lg w-[450px] rounded-md">
      {
        !hideState &&
        <>
          <CardHeader className="px-6">
            <p className="text-xl">Live Chat</p>
          </CardHeader>
          <Divider />
          <CardBody className="h-[350px] p-5 scrollbar message-container">
            <div className="flex flex-col gap-2">
              {
                messageHistory.map((item, index) =>
                  <div key={index} className="flex w-full gap-2">
                    <Avatar
                      className="flex-none" size="sm"
                      onClick={() => { goToUserIndex(item.userId) }}
                      src={`${StoreFileHost}${item.profile}`} />
                    <div className="flex flex-col w-full">
                      <p onClick={() => { goToUserIndex(item.userId) }}
                        className="text-default-500 w-[350px]">{item.username}</p>
                      <a className="w-[370px]">{item.message}</a>
                    </div>
                  </div>
                )
              }
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="relative overflow-visible">
            {
              omissionCount !== 0 &&
              <Chip color="primary" className="absolute left-1/2 -top-9 -translate-x-1/2">New +{omissionCount}</Chip>
            }
            <LiveChatInput webSocket={webSocket} />
          </CardFooter>
          <Divider />
        </>
      }
      <CardFooter>
        <Button
          fullWidth
          variant="light"
          onPress={() => { setHideState(pre => !pre) }}>
          Hide Chat
        </Button>
      </CardFooter>
    </Card >
  )
}
