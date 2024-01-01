"use client"
import {  Listbox, ListboxItem } from "@nextui-org/react"
import {
  UserIcon,
  UploadIcon,
  LiveIcon
} from "@/components/common/icons";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export const SelectMenu = () => {

  const router = useRouter()
  const pathname = usePathname()

  const menuItem = [
    {
      key: '/account',
      onPress: () => { router.push('/account') },
      startContent: <UserIcon size={24} />,
      content: `Information`
    },
    {
      key: '/upload',
      onPress: () => { router.push('/upload') },
      startContent: <UploadIcon size={24} />,
      content: `Upload Video`
    },
    {
      key: '/liveData',
      onPress: () => { router.push('/liveData') },
      startContent: <LiveIcon size={24} />,
      content: `Live License`
    }
  ]

  return (
    <div className="fixed l-0 w-[225px] h-full z-10 bg-sd-background border-r-1 dark:border-zinc-500">
      <Listbox
        className="gap-2 bg-sd-background min-w-[200px] mt-5
										 overflow-visible rounded-medium p-0 justify-center px-2"
        itemClasses={{
          base: 'px-8 rounded-none gap-3 h-12 dark:data-[hover=true]:bg-[#1f1f1f] data-[hover=true]:bg-[#f4f4f5]',

        }}>
        {
          menuItem.map((item) =>
            <ListboxItem
              key={item.key}
              className={
                clsx(
                  'rounded-full',
                  {
                    'bg-[#f4f4f5] dark:bg-[#1f1f1f]': pathname === item.key
                  }
                )
              }
              onPress={item.onPress}
              startContent={item.startContent}>
              {item.content}
            </ListboxItem>
          )
        }
      </Listbox>
    </div>
  )
}