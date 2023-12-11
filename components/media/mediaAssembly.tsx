"use client";
import clsx from "clsx";

import {
  Card, CardBody, CardFooter, CardHeader,
  Image, User, Button, Chip, Avatar, Skeleton
} from "@nextui-org/react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { ClassValue } from "tailwind-variants";
import { Category, SimpleVideo } from "@/types/media";
import { getModuleRecommend } from "@/api/media";
import { StoreFileHost } from "@/types";
import { calculateDuration } from "@/utils/common/memoFun"

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { MediaType } from "@/types/enum";
import numberal from 'numeral';

const pushVideo = (video: SimpleVideo, router: AppRouterInstance) => {
  router.push(`/watch?id=${video.id}&type=${MediaType.VIDEO}`)
}

const MediaCard = (
  props: {
    video: SimpleVideo,
    isLoading: boolean
  }
) => {
  const dispatch = useAppDispatch()

  const fromNow = useMemo(() => {
    return calculateDuration(props.video.publicTime)
  }, [props.video])
  const router = useRouter()

  return (
    <>
      <Card
        isPressable
        onPress={(e) => {
          pushVideo(props.video, router)
        }}
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 items-start cursor-pointer"
        shadow="sm"
      >
        <Image isBlurred
          shadow="sm"
          radius="lg"
          width="100%"
          className="w-full object-cover"
          src={StoreFileHost + props.video.coverPath}
          alt="NextUI Album Cover" />
        <CardFooter className="text-small flex-grow items-start">
          <div className="flex items-start gap-4">
            <Avatar
              onClick={() => { console.log(1) }}
              className='flex-none w-[32px] h-[32px] mt-1'
              src={StoreFileHost + props.video.author.profile} />
            <div className="flex flex-col justify-start text-start gap-1">
              <p className="line-clamp-1">{props.video.title}</p>
              <div className="text-default-400 text-xs">
                <p className="line-clamp-1">{props.video.author.username}</p>
                <p className="line-clamp-1">{props.video.clickedCount} views · {fromNow}</p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export const MediaCardGrid = (
  props: {
    mediaList: SimpleVideo[],
    grid?: string,
    gap?: string,
  }
) => {
  return (
    <div className={clsx(
      "grid",
      props.grid || "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ",
      props.gap || "gap-4"
    )}>
      {
        props.mediaList.map((item, index) =>
          <MediaCard isLoading={false} key={item.id} video={item}></MediaCard>)
      }
    </div>
  )
}

export const ChipModule = (
  props: {
    chipList: any[]
  }
) => {
  return (
    <div className="flex gap-4">
      {
        props.chipList.map((item, index) =>
          <Chip key={item.id}
            className="h-8"
            classNames={{
              content: "w-20 text-base/7 flex justify-center h-full"
            }}
            color="primary"
            radius="sm">
            {item.name}
          </Chip>
        )
      }
    </div>
  )
}

export const MediaCardModule = (
  props: {
    module: Category,
    isList?: boolean,
    slot?: ReactNode,
    grid?: string,
    gap?: string,
  }
) => {

  const [videList, setVideoList] = useState<SimpleVideo[]>([])
  useEffect(() => {
    const fetchData = async () => {
      await getModuleRecommend(props.module.id).then(res => {
        setVideoList(res.result)
      })
    }
    fetchData()
  }, [])

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        {
          props.slot ||
          (
            <>
              <h1 className="text-xl mb-4">{props.module.name}</h1>
              <Button radius="full"
                variant="shadow"
                color="primary"
                size="sm">
                More
              </Button>
            </>
          )
        }
      </div>
      {
        !props.isList ? (
          <MediaCardGrid
            mediaList={videList}
            grid={props.grid}
            gap={props.gap}
          />
        ) : (
          <MediaCardList
            mediaList={videList}
          />
        )
      }
    </div>
  )
}

const MediaCommonItem = (
  props: {
    information: SimpleVideo,
    className?: ClassValue,
    imageSize?: string,
    fontSize?: string
    disableDescription?: boolean
  }
) => {

  const imageClass = clsx(
    "object-cover",
    props.imageSize || "h-[160px] w-[250px]"
  )

  return (
    <div className={clsx("w-full gap-4 flex mt-0 mb-3", props.className)}>
      <div className="flex-none">
        <Image
          shadow="sm"
          radius="lg"
          className={imageClass}
          src={`${StoreFileHost}${props.information.coverPath}`}
          alt="NextUI Album Cover" />
      </div>
      <div className="line-clamp-2">
        <p className={`line-clamp-2 ${props.fontSize || "text-lg"}`}>
          {props.information?.title}
        </p>
        <p className="text-small text-foreground-400 mb-2 line-clamp-2">
          {props.information.author.username} · {numberal(props.information.clickedCount).format("0a")} views ·
          {calculateDuration(props.information.publicTime)}
        </p>
        {
          props.disableDescription &&
          <p className="text-small text-foreground-400 line-clamp-2">
            {props.information.introduction}
          </p>
        }
      </div>
    </div>
  )
}

const MediaListItem = () => {
  return (
    <>
      <Card
        isBlurred
        className="w-full border-none bg-background/60 dark:bg-default-100/50 mb-6"
        shadow="sm"
      >
        <CardHeader>
          <User
            name="施利TV"
            avatarProps={{
              className: 'flex-none w-[32px] h-[32px] mr-1',
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            }}
          />
        </CardHeader>
        <CardBody className="overflow-hidden px-3 pb-3 pt-0">
          <MediaCommonItem information={{} as SimpleVideo} />
        </CardBody>
      </Card>
    </>
  )
}

export const MediaList = (
  props: {
    mediaList: SimpleVideo[]
  }
) => {
  return (
    <div className="mx-3 flex-col">
      {
        props.mediaList.map((item, index) =>
          <MediaCommonItem key={item.id}
            information={item}
            imageSize="h-[110px] w-[180px]"
            fontSize="text-sm" />
        )
      }
    </div>
  )
}

export const MediaCardList = (
  props: {
    mediaList: any[]
  }
) => {
  return (
    <>
      {
        props.mediaList.map((item, index) =>
          <MediaListItem key={item} ></MediaListItem>
        )
      }
    </>
  )
}

export const PlayList = (
  props: {
    className?: ClassValue
  }
) => {
  const [recommend, setRecommend] = useState<SimpleVideo[]>([])
  const fetchData = async () => {
    await getModuleRecommend('1').then(res => {
      setRecommend(res?.result)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={clsx(props.className, "mb-4 rounded-xl dark:shadow-white-lg")}>
      <Card className="">
        <CardHeader className="flex gap-3 px-4">
          <div className="flex flex-col">
            <p className="text-xl ml-2 mb-2">Title</p>
            <div className="flex items-center gap-4">
              <Chip color="primary" radius="sm">Chip</Chip>
              <p className="text-small text-default-500">Author</p>
              <p className="text-small text-default-500">20 videos</p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="py-1 px-5 max-h-[400px] scrollbar">
          {
            recommend.map((item, index) =>
              <MediaCommonItem key={index}
                information={item}
                className={clsx(
                  "px-2 py-2 rounded-lg",
                  { "bg-default-200 shadow": index === 1 }
                )}
                imageSize="h-[80px] w-[150px]"
                fontSize="text-sm" />
            )
          }
        </CardBody>
      </Card>
    </div>
  )
}


export const BriefArea = (
  props: {
    className?: ClassValue,
    bodyClassName?: ClassValue,
    content: string
  }
) => {
  const [briefExpand, setBriefExpand] = useState(false)
  const briefClass = clsx({
    'line-clamp-2': !briefExpand
  })

  return (
    <Card
      shadow='sm'
      isPressable
      className={clsx(
        'mb-10 bg-[#f2f2f2] dark:bg-[#3F3F46] w-full',
        props.className
      )}
      classNames={{
        base: "border-none"
      }}
      onPress={() => setBriefExpand(!briefExpand)}>
      <CardBody className={clsx(props.bodyClassName)}>
        <p className={briefClass}>
          {props.content}
        </p>
      </CardBody>
    </Card>
  )
}