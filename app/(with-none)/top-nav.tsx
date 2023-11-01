"use client";
import { Button } from "@nextui-org/react"
import { ThemeSwitch } from "@/components/common/theme-switch"
import { useRouter } from "next/navigation";

export const TopNav = () => {
  const router = useRouter()

  return (
    <div className="flex justify-between mx-8 mt-6">
      <Button onClick={() => { router.push("/") }}>Back Home</Button>
      <ThemeSwitch />
    </div>
  )
}