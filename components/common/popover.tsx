import { getAuthInfo, isExist } from "@/utils/common/tokenUtils";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

export const LoginPopover = ({
  children,
}: {
  children: React.ReactNode,
}) => {

  return (
    <PopoverButton content="Please login" active={!isExist()}>{children}</PopoverButton>
  )
}

export const PopoverButton = ({
  children,
  title,
  content,
  active,
}: {
  children: React.ReactNode,
  content: string,
  title?: string,
  active?: boolean
}) => {

  return (
    active ? (
      <Popover placement="bottom" >
        <PopoverTrigger>
          {children}
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">{title}</div>
            <div className="text-tiny">{content}</div>
          </div>
        </PopoverContent>
      </Popover >
    ) :
      (
        <>{children}</>
      )
  )
}