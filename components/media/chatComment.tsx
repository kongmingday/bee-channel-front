/*
 * @Author: err0r
 * @Date: 2023-10-21 09:53:05
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-27 23:02:37
 * @Description: 
 * @FilePath: \bee-channel-front\components\media\chatComment.tsx
 */
"use client";
import {
  Avatar, Button, Textarea,
  Popover, PopoverContent, PopoverTrigger
} from "@nextui-org/react"
import { SmileIcon, SortIcon } from "../common/icons"
import { useTheme } from "next-themes";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useRef, useState, Ref } from "react";

const ChatCommentItem = (
  props: {

  }
) => {

}

const ChatCommentList = (
  props: {

  }
) => {

}

const CommentInput = () => {

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
    <div className="flex gap-4">
      <Avatar
        className="flex-none"
        src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <div className="flex-col flex-1 items-start">
        <Textarea
          minRows={1}
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
      </div>
      <Button color="primary">Commit</Button>
    </div>
  )
}

export const ChatComment = (
  props: {

  }
) => {

  return (
    <div className="flex-col ">
      <div className="flex items-center mb-2">
        <p className="text-lg">1013 Comments</p>
        <Button className="bg-inherit text-md"><SortIcon />Sort by</Button>
      </div>
      <CommentInput />
    </div>
  )
}