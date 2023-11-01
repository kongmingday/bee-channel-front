/*
 * @Author: err0r
 * @Date: 2023-10-21 09:53:05
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-30 10:52:13
 * @Description: 
 * @FilePath: \bee-channel-front\components\media\chatComment.tsx
 */
"use client";
import {
  Avatar, Button, Textarea, Link, Pagination,
  Popover, PopoverContent, PopoverTrigger, Card, CardHeader, CardBody, CardFooter, Divider
} from "@nextui-org/react"
import { LikeIcon, MoneyIcon, SmileIcon, SortIcon, UnlikeIcon } from "../common/icons"
import { useTheme } from "next-themes";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useRef, useState, Ref, useEffect } from "react";
import { ClassValue } from "tailwind-variants";
import clsx from "clsx";

const ChatCommentItem = (
  props: {

  }
) => {
  // TODO
  const flag = true
  const [replyState, setReplyState] = useState(false)

  return (
    <>
      <div className="flex items-start gap-4">
        <Avatar
          className="flex-none mt-1"
          src="https://avatars.githubusercontent.com/u/30373425?v=4"
        />
        <div className="flex-col gap-1">
          <p>{"Junior Garcia"}</p>
          <p>
            {"I've lost count of how many times I have watched this before going to bed. Out of all the other ear cleaning videos that I'd seen of Shili's, for some reason this one relaxes me instantly and puts me right to sleep. The way the lady moves is so careful, gentle, and not rushed."}
          </p>
          <div className="flex gap-4 items-center">
            <div className="flex items-center justify-start">
              <Button size="sm" radius="full" className="block" variant="light" isIconOnly>
                <LikeIcon size={25} />
              </Button>
              <div>25K</div>
            </div>
            <Button variant="light" radius="full" isIconOnly>
              <UnlikeIcon size={25} />
            </Button>
            <Button variant="light" radius="full"
              onClick={() => { setReplyState(state => !state) }}>
              Reply
            </Button>
          </div>
          {replyState && <CommentInput className="mt-2" />}
        </div>
      </div>
    </>
  )
}

const ChatCommentList = (
  props: {

  }
) => {
  const resData = [
    { value: 1, childern: null },
    { value: 1, childern: [{ value: 1, childern: null }, { value: 1, childern: null }] },
    { value: 1, childern: null },
    { value: 1, childern: null },
    { value: 1, childern: null }]
  const [replyComentState, setReplyComentState] = useState(new Array<boolean>(resData.length).fill(false))
  const handleMoreReplyClick = (index: number) => {
    setReplyComentState(arr => {
      arr[index] = !arr[index]
      console.log(arr)
      return [...arr]
    })
  }

  return (
    <div className="flex-col mt-6 gap-8 flex items-start">
      {
        resData.map((item, index) =>
          <div key={index} >
            <ChatCommentItem />
            {
              item.childern && <Button className="ml-12 px-0 block" variant="light" radius="full"
                onClick={() => { handleMoreReplyClick(index) }}>
                15 replies
              </Button>
            }
            {
              replyComentState[index] &&
              item.childern?.map((item, index) =>
                <div className="ml-12" key={index} >
                  <ChatCommentItem />
                </div>
              )
            }
            {
              replyComentState[index] &&
              <Pagination
                classNames={{
                  cursor: "bg-black text-white dark:bg-white dark:text-black"
                }}
                className="ml-[5.5rem] mt-2"
                total={10}
                initialPage={1}
                size="sm" />
            }
          </div>
        )
      }
    </div>
  )
}

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

const CommentInput = (
  prop: {
    className?: ClassValue
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
    <div className={
      clsx("flex gap-4", prop.className)
    }>
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

export const LiveChat = (
  props: {

  }
) => {
  const hideState = useState(false)
  const resData = [1, 1, 1, 1, 1, 1, 1, 1, 1]

  return (
    <Card className="mb-6">
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
      <ChatCommentList />
    </div>
  )
}