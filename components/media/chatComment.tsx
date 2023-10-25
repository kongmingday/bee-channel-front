/*
 * @Author: err0r
 * @Date: 2023-10-21 09:53:05
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-24 20:29:25
 * @Description: 
 * @FilePath: \bee-channel-front\components\media\chatComment.tsx
 */

import { Avatar, Button, Textarea } from "@nextui-org/react"
import { SortIcon } from "../common/icons"

export const ChatCommentItem = (
  props: {

  }
) => {

}

export const ChatCommentList = (
  props: {

  }
) => {

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
      <div className="flex gap-4 items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Textarea
          minRows={2}
          labelPlacement="outside"
          placeholder="Add a comment"
          className=""
        />
        <Button color="primary">Commit</Button>
      </div>
    </div>
  )
}