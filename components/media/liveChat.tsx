
"use client";
import {
  Avatar, Button, Textarea, Divider,
  Popover, PopoverContent, PopoverTrigger,
  Card, CardHeader, CardBody, CardFooter,
} from "@nextui-org/react"
import { useTheme } from "next-themes";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import React, { useRef, useState, Ref } from "react";

import { SmileIcon, MoneyIcon } from "../common/icons"

const LiveChatInput = (
  prop: {
  }
) => {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>()
  const [comment, setComment] = useState('')
  const handleEmojiChange = (emoji: any) => {
    const current = inputRef.current!
    const position = current.selectionStart!

    if (position == current.value.length) {
      current.value += emoji.native
      current.focus()
      return;
    }
    const front = current.value.substring(0, position);
    const later = current.value.substring(position);
    current.value = front + emoji.native + later
    current.focus()
    current.selectionStart = position + emoji.native.length
    current.selectionEnd = position + emoji.native.length
  }

  return (
    <div className="flex gap-4 w-full">
      <Avatar
        className="flex-none"
        src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <div className="flex-col flex-1 items-start">
        <Textarea
          minRows={1}
          maxRows={3}
          variant="underlined"
          ref={inputRef as Ref<HTMLInputElement>}
          classNames={{
            label: "hidden"
          }}
          placeholder="Add a comment"
          defaultValue={comment}
        />
        <Popover
          placement="bottom-start"
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
          placement="bottom-start"
          showArrow={true}>
          <PopoverTrigger>
            <Button size="sm"
              variant="light"
              isIconOnly>
              <MoneyIcon size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            {/* TODO Display payment style */}
            <div>Payment Display</div>
          </PopoverContent>
        </Popover>
      </div>
      <Button color="primary">Commit</Button>
    </div>
  )
}

export const LiveChat = (
  props: {

  }
) => {
  const hideState = useState(false)
  const resData = [1, 1, 1, 1, 1, 1, 1, 1, 1]

  return (
    <Card className="mb-6 shadow-white-lg">
      <CardHeader className="px-6">
        <p className="text-xl">Live Chat</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row flex-wrap items-star max-h-[400px] gap-4">
        {
          resData.map((item, index) =>
            <div key={item} className="flex">
              <Avatar className="mr-4 flex-none" size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <p>
                <span className="mr-2 text-default-500">Chat Messeenger</span>
                {"What the hell! It's the best action in my opinion! Thank you!"}
              </p>
            </div>
          )
        }
      </CardBody>
      <Divider />
      <CardFooter>
        <LiveChatInput />
      </CardFooter>
      <Divider />
      <CardFooter>
        <Button fullWidth variant="light">
          Hide Chat
        </Button>
      </CardFooter>
    </Card >
  )
}
