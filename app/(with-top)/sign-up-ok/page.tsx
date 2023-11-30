"use client"
import { enable } from "@/api/auth"
import { Spinner } from "@nextui-org/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const situation = [
  {
    content: (
      <>
        <h1 className="text-3xl">Please wait for seconds</h1>
        <Spinner className="mt-2" color="secondary" />
      </>
    )
  },
  {
    content: (
      <h1 className="text-3xl">Sorry, your code is expired, please restart.
        <Link
          href="/sign-up"
          className="text-yellow-500 ml-2 cursor-pointer">
          Sign up
        </Link>
      </h1>
    )
  }, {
    content: (
      <h1 className="text-3xl">
        Your account has been activated!
        <Link
          href="/sign-in"
          className="text-yellow-500 ml-2 cursor-pointer">
          Sign in
        </Link>
      </h1>
    )
  }
]

export default function Page() {
  const searchParam = useSearchParams()
  const router = useRouter()

  const [judge, setJudge] = useState<number>(0)

  useEffect(() => {
    const email = searchParam.get('email')
    const token = searchParam.get('token')
    if (email && token) {
      enable({ email, token })
        .then(res => {
          if (res) {
            setJudge(2)
            return;
          }
          setJudge(1)
        })
    } else {
      router.push('/')
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-96 gap-4">
      {
        situation[judge].content
      }
    </div>
  )
}