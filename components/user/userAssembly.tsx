import { User, Dropdown, DropdownItem, DropdownTrigger, Button, DropdownMenu } from "@nextui-org/react"
import { MenuIcon } from "../common/icons"

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

export const UserList = (
  props: {
    authorList: any[]
  }
) => {
  return (
    <>
      <div className="w-full flex flex-col flex-wrap gap-8">
        {
          props.authorList.map(item =>
            <UserItem author={item} key={item} />
          )
        }
      </div>
    </>
  )
}