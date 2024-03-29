/*
 * @Author: err0r
 * @Date: 2023-09-25 22:59:33
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-29 14:48:18
 * @Description: 
 * @FilePath: \bee-channel-front\app\subscriptions\page.tsx
 */
"use client"

import { Metadata } from "next";
import { Input, Pagination } from "@nextui-org/react";
import { MediaCardList } from '@/components/media/mediaAssembly'
import { UserList } from "@/components/user/userAssembly";
import { LinkTabs } from "@/components/common/tabs";
import { Key, useState } from "react";

const UserListFragment = (
  props: {
    authorList: any[]
  }
) => {
  return (
    <>
      <Input
        className="w-15 mx-4 mb-5"
        type="search"
        label="Search"
        labelPlacement="outside-left"
        endContent={
          <div></div>
        }
      />
      <UserList authorList={props.authorList} />
      <Pagination
        className="w-full flex justify-center mt-5"
        classNames={{
          cursor: "shadow-md bg-stone-200 dark:bg-primary"
        }}
        total={10}
        initialPage={1} />
    </>
  )
}

export default function Page() {
  const resData = [1, 2, 3, 4]
  const linkData = ['Video', 'User']
  const [currentKey, setCurrentKey] = useState("")
  const currentKeyChangeHandle = (key: Key) => {
    setCurrentKey(key.toString())
  }

  const tabsOptions = [{
    key: 'Video',
    content: <> </> // <MediaCardList mediaList={resData} />
  }, {
    key: 'User',
    content: <UserListFragment authorList={resData} />
  }]

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap w-full lg:w-[90%]">
          <LinkTabs tabItemList={linkData}
            selectChange={key => (currentKeyChangeHandle(key))} />
          {
            tabsOptions.find(item =>
              item.key == currentKey
            )?.content
          }
        </div>
      </div>
    </>
  );
}
