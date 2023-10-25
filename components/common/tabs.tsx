import { Tabs, Tab } from "@nextui-org/react";
import { Key, ReactNode, useState } from "react";

export const LinkTabs = (
  props: {
    tabItemList: string[]
    selectChange: (key: Key) => void
  }
) => {

  const tabsKeyChangeHandle = (key: Key) => {
    props.selectChange(key)
  }


  return (
    <div className="flex w-full flex-col px-2">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        onSelectionChange={key => tabsKeyChangeHandle(key)}
        className="mb-5"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0",
          cursor: "w-full bg-current",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-inherit"
        }}
      >
        {
          props.tabItemList.map(item =>
            <Tab
              key={item}
              title={
                <div className="flex items-center space-x-2 text-lg">
                  <span>{item}</span>
                </div>
              }
            />
          )
        }
      </Tabs>
    </div>
  );
}