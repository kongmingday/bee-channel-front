import { User, Dropdown, DropdownItem, DropdownTrigger, Button, DropdownMenu, Avatar } from "@nextui-org/react"
import { MenuIcon } from "../common/icons"
import { getAuthInfo, getAuthInfoLocal } from "@/utils/common/tokenUtils"
import { Dispatch, SetStateAction, useState } from "react"
import clsx from "clsx"
import { UserAndRelationship } from "@/types/auth"
import numeral from "numeral"
import { subscribeActoin } from "@/api/user"

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST

const UserItem = (
  props: {
    author: any
  }
) => {
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    }]
  return (
    <div className="flex justify-between px-4">
      <User
        name="Jane Doe"
        description={
          <div className="mt-1">Product Designer</div>
        }
        avatarProps={{
          className: 'w-12 h-12 flex-none',
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
        }}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
          >
            <MenuIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {items.map(item =>
            <DropdownItem
              key={item.key}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export const UserItemDisplay = (
  props: {
    userInfo?: UserAndRelationship
    setUsreInfo?: (userInfo: UserAndRelationship) => void
  }
) => {

  const [briefState, setBriefState] = useState(false)
  const briefClass = clsx(
    "cursor-default",
    {
      'line-clamp-2': briefState
    }
  )

  const handleOnSubscribeChange = async () => {

    await subscribeActoin(props.userInfo?.id!).then(res => {
      if (res.code === 200 && props.userInfo && props.setUsreInfo) {
        props.setUsreInfo({
          ...props.userInfo,
          hasConcern: !props.userInfo?.hasConcern
        })
      }
    })
  }

  const authInfo = getAuthInfoLocal()
  return (
    <div className="flex gap-6 " >
      <Avatar className="flex-none w-20 h-20" src={`${StoreFileHost}${props.userInfo?.profile}`} />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-6">
          <div className="text-2xl">{props.userInfo?.username}</div>
          {
            authInfo?.information?.id !== props.userInfo?.id &&
            <Button
              onPress={() => { handleOnSubscribeChange() }}
              className="mt-2"
              radius="full"
              color="primary" >
              {props.userInfo?.hasConcern ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          }
        </div>
        <div className="text-default-500">
          {`${numeral(props.userInfo?.subscribeCount).format("0a")} subscriber`}
        </div>
        <p className={briefClass}
          onClick={() => { setBriefState(state => !state) }}
        >
          {props.userInfo?.introduction || 'the guy is so lazy'}
        </p>
      </div>
    </div >
  )
}

export const SearchUserGrid = (
  props: {
    userList: UserAndRelationship[]
  }
) => {
  return (
    <div className="w-full grid grid-cols-2 gap-x-5 gap-y-10">
      {
        props.userList.map(item =>
          <UserItemDisplay key={item.id} userInfo={item} />
        )
      }
    </div>
  )
}

export const UserList = (
  props: {
    authorList: any[]
  }
) => {
  return (
    <div className="w-full flex flex-col flex-wrap gap-8">
      {
        props.authorList.map(item =>
          <UserItem author={item} key={item} />
        )
      }
    </div>
  )
}