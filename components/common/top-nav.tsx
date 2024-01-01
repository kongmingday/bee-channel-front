/*
 * @Author: err0r
 * @Date: 2023-11-01 22:18:48
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-02 22:42:24
 * @Description: 
 * @FilePath: \bee-channel-front\app\(with-none)\top-nav.tsx
 */
"use client";
import { Button } from "@nextui-org/react"
import { ThemeSwitch } from "@/components/common/theme-switch"
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./icons";
import clsx from "clsx";

export const TopNav = (
  props: {
    isFixed?: boolean
  }
) => {
  const router = useRouter()

  return (
    <div className={
      clsx("flex justify-between px-8 py-2 grow-0 z-50 w-full bg-background",
        {
          'fixed bg-sd-background shadow-md': props.isFixed
        })
    }>
      <Button
        variant='light'
        onClick={() => { router.push("/") }}>
        <ArrowLeftIcon /> Home
      </Button>
      <ThemeSwitch />
    </div>
  )
}