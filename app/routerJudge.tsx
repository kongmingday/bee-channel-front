/*
 * @Author: err0r
 * @Date: 2023-10-21 08:21:06
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-25 20:29:28
 * @Description: 
 * @FilePath: \bee-channel-front\app\routerJudge.tsx
 */
"use client";

import { useEffect, useState } from "react";
import { CommonMenu } from "@/components/common/menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeFixedState, changeOpenState } from "@/store/slices/menuSlice";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function RouterJudge({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  const [wh, setWh] = useState({
    weight: 0,
    height: 0
  })

  useEffect(() => {
    if (window.innerWidth > 1024 && !menu.isFixed) {
      dispatch(changeFixedState(true))
      dispatch(changeOpenState(false))
    } else if (window.innerWidth <= 1024 && menu.isFixed) {
      dispatch(changeFixedState(false))
      dispatch(changeOpenState(false))
    }
  }, [wh])



  useEffect(() => {
    const handleSize = () => {
      setWh({
        weight: window.innerWidth,
        height: window.innerHeight
      })
    }

    if (pathname === '/watch') {
      dispatch(changeFixedState(false))
      dispatch(changeOpenState(false))
    } else {
      if (window.innerWidth > 1024) {
        dispatch(changeFixedState(true))
      }
      dispatch(changeOpenState(false))
      window.addEventListener('resize', handleSize)
    }

    return () => {
      if (pathname === '/watch') {
        return;
      }
      window.removeEventListener('resize', handleSize)
    }
  }, [pathname])


  const containerClass = clsx(
    "w-full p-4 flex-grow",
    {
      "lg:pl-64": menu.isFixed
    }
  )

  return (
    <>
      <CommonMenu />
      <main className={containerClass}>
        {children}
      </main>
    </>
  );
}
