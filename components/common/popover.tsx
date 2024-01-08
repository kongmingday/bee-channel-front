import { getAuthInfo, isExist } from "@/utils/common/tokenUtils";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

export const LoginPopover = ({
  children,
}: {
  children: React.ReactNode,
}) => {

  return (
    <PopoverWrapper content="Please login" active={isExist()}>{children}</PopoverWrapper>
  )
}

export const PopoverWrapper = ({
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
    active ?
      (
        <>{children}</>
      ) :
      (
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
      )
  )
}