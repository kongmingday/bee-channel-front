"use client";
import clsx from "clsx";

import { Meida } from "@/types/normal";
import { Card, CardBody, CardFooter, Image, User, Button, Avatar, CardHeader } from "@nextui-org/react";
import { ReactNode } from "react";

const MediaCard = () => {
  return (
    <>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody className="overflow-visible p-0">
          <Image isBlurred
            shadow="sm"
            radius="lg"
            width="100%"
            className="w-full object-cover h-[230px]"
            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            alt="NextUI Album Cover" />
        </CardBody>
        <CardFooter className="text-small">
          <User
            className="items-start"
            name="ASMR Chinese Ancient Face Spa Treatment + Scalp Message" // title
            description={
              <>
                <div>Product Design</div>
                <div>2K views · 3 years ago</div>
              </>
            }
            avatarProps={{
              className: 'flex-none w-[32px] h-[32px] mt-1 mr-1',
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            }}
          />
        </CardFooter>
      </Card>
    </>
  )
}

export const MediaCardGrid = (
  props: {
    mediaList: any[],
    grid?: string,
    gap?: string,
  }
) => {
  return (
    <div className={clsx(
      "grid",
      props.grid || "md:grid-cols-2 lg:grid-cols-3 ",
      props.gap || "gap-4"
    )}>
      {
        props.mediaList.map((item, index) =>
          <MediaCard key={item}></MediaCard>)
      }
    </div>
  )
}

export const MediaCardModule = (
  props: {
    mediaList: any[],
    isList?: boolean,
    slot?: ReactNode,
    grid?: string,
    gap?: string,
  }
) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between">
        {
          props.slot ||
          (
            <>
              <h1 className="text-xl mb-4">Test Module Title</h1>
              <Button radius="full"
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
            mediaList={props.mediaList}
            grid={props.grid}
            gap={props.gap}
          />
        ) : (
          <MediaCardList
            mediaList={props.mediaList}
          />
        )
      }
    </div>
  )
}

const MediaCommonItem = (
  props: {
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
    <div className="w-full gap-4 flex mt-0 mb-3">
      <div className="flex-none">
        <Image
          shadow="sm"
          radius="lg"
          className={imageClass}
          src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
          alt="NextUI Album Cover" />
      </div>
      <div className="line-clamp-2">
        <p className={`line-clamp-2 ${props.fontSize || "text-lg"}`}>
          ASMR Chinese Ancient Face Spa Treatment + Scalp Message
        </p>
        <p className="text-small text-foreground-400 mb-2 line-clamp-2">
          Product Design · 2K views · 3 years ago
        </p>
        {
          props.disableDescription && <p className="text-small text-foreground-400 line-clamp-2">This is Meida Test Introduction gulugulugulu</p>
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
          <MediaCommonItem />
        </CardBody>
      </Card>
    </>
  )
}

export const MediaList = (
  props: {
    mediaList: any[]
  }
) => {
  return (
    <div className="mx-3 flex-col">
      {
        props.mediaList.map((item, index) =>
          <MediaCommonItem key={item}
            imageSize="h-[100px] w-[150px]"
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