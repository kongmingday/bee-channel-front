import classNames from 'classnames'
import { useEffect, useState } from "react";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation'

import { siteConfig } from '@/config/site';
import { Logo, MenuIcon } from './icons';
import { useMenu, useMenuDispatch } from '@/context/MenuContext';
import { User as UserType } from '@/types/normal';

const MenuListBox = (
  props: {
    itemList: any[]
  }
) => {

  const router = useRouter()
  const pathame = usePathname()
  const [selectedKeys, setSelectedKeys] = useState('')

  const handleSelectionChange = (key: any) => {
    setSelectedKeys(key)
    router.push(`/${key}`)
  }

  const menuIconClass = "text-default-500 mr-2"

  return (
    <Listbox
      variant="flat"
      aria-label='menu'
      selectedKeys={selectedKeys}
    >
      {
        props.itemList.map(item =>
          <ListboxItem
            key={item.key}
            startContent={<div className={menuIconClass}>{item.Icon}</div>}
            textValue={item.label}
            onClick={() => handleSelectionChange(item.key)}
            className={
              classNames(
                'flex items-center h-10 align-middle',
                {
                  "bg-default-200 shadow": pathame === `/${item.key}`
                }
              )
            }
          >
            <p className={"text-base"}>{item.label}</p>
          </ListboxItem>
        )
      }
    </Listbox >
  )
}

const SubscriptionListBox = (
  props: {
    itemList: UserType[]
  }
) => {

  const router = useRouter()
  const pathame = usePathname()
  const [selectedKeys, setSelectedKeys] = useState('')

  const handleSelectionChange = (key: string) => {
    setSelectedKeys(key)
    router.push(`/user/${key}`)
  }

  const titleClass = "text-base self-start ml-3 mt-3"

  return (
    <>
      <p className={titleClass}>Subscriptions</p>
      <Listbox
        variant="flat"
        aria-label='menu'
        selectedKeys={selectedKeys}
      >
        {
          props.itemList.map(item =>
            <ListboxItem
              key={item.userId}
              // startContent={<div className={menuIconClass}>{item.Icon}</div>}
              onClick={() => handleSelectionChange(item.userId)}
              className={
                classNames(
                  {
                    "bg-default-200 shadow": false // pathame === `/${item.key}`
                  }
                )
              }
            >
              <div className='flex items-center'>
                <Avatar size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <p className='ml-4'>{item.username}</p>
              </div>
            </ListboxItem>
          )
        }
      </Listbox >
    </>
  )
}

export const CommonMenu = (
  props: {
    isFixed?: boolean
  }
) => {

  const menuState = useMenu()
  const dispatch = useMenuDispatch()
  const menuMap = siteConfig.navItems
  const [subscriptions, setSubscriptions] = useState([] as UserType[])


  useEffect(() => {
    setSubscriptions([{
      userId: '123123',
      username: 'nihao',
      avatar: 'none'
    }])
  }, [])

  const menuClass = classNames(
    "fixed z-50 w-60 h-full bg-background transition-transform",
    "flex-col items-center p-4 lg:z-[30]",
    {
      "translate-x-0": menuState && !props.isFixed
    },
    {
      "lg:translate-x-0": props.isFixed
    },
    {
      "-translate-x-60": !menuState
    },
  )

  // const menuClassOnFixed = classNames(
  //   "lg:flex absolute z-50 w-60 h-full bg-background transition-transform ",
  //   {
  //     "-translate-x-60": !menuState
  //   },
  //   "flex flex-col items-center p-4 lg:translate-x-0",
  // )


  const maskClass = classNames(
    "fixed z-40 w-full h-full bg-slate-500 opacity-10",
    {
      "hidden": !menuState
    },
    {
      "lg:hidden": props.isFixed
    }
  )

  // const maskClassOnFixed = classNames(
  //   "absolute z-40 w-full h-full bg-slate-500 opacity-30",
  //   {
  //     "hidden": !menuState
  //   },

  // )

  const maskChangeHandle = () => {
    dispatch({
      type: 'changed',
      state: !menuState
    })
  }

  return (
    <>
      <div className={menuClass}>
        <div className='w-full flex justify-start items-center ml-6 mb-4'>
          <MenuIcon className='mr-4' />
          <Logo />
        </div>
        {
          menuMap.map((item, index) =>
            <>
              <MenuListBox itemList={item} key={index} />
              <Divider />
            </>
          )
        }
        <SubscriptionListBox itemList={subscriptions} />
        <Divider />
      </div >
      <div className={maskClass}
        onClick={maskChangeHandle}
      />
    </>
  )
}