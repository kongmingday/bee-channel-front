"use client"

import { Metadata } from "next";
import { Input, Pagination } from "@nextui-org/react";
import { MediaCardList } from '@/components/media/mediaAssembly'
import { UserList } from "@/components/user/userAssembly";
import { LinkTabs } from "@/components/common/tabs";
import { Key, useState } from "react";

const AuthorListFragment = (
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
          cursor: "bg-black dark:bg-white dark:text-black"
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
    content: <MediaCardList mediaList={resData} />
  }, {
    key: 'User',
    content: <AuthorListFragment authorList={resData} />
  }]

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap w-full lg:w-[90%]">
          <LinkTabs tabItemList={linkData} selectChange={key => (currentKeyChangeHandle(key))} />
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
