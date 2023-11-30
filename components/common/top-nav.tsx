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

export const TopNav = () => {
  const router = useRouter()

  return (
    <div className="flex justify-between mx-8 mt-6 grow-0">
      <Button
        onClick={() => { router.push("/") }}>
        Back Home
      </Button>
      <ThemeSwitch />
    </div>
  )
}