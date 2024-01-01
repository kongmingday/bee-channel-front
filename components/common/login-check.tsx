"use client"
import { getAuthInfo } from "@/utils/common/tokenUtils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const LoginCheck = () => {
  const router = useRouter()
  useEffect(() => {
    const authInfo = getAuthInfo()
    if (!authInfo) {
      router.push("/sign-in")
    }
  }, [])
  return (<></>)
}