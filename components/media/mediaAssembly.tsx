"use client";
import { Meida } from "@/types/normal";
import { Card, CardBody, CardFooter, Image, User, Button, Avatar, CardHeader } from "@nextui-org/react";

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
    mediaList: any[]
  }
) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        props.mediaList.map((item, index) =>
          <MediaCard key={item}></MediaCard>)
      }
    </div>
  )
}

export const MediaCardModule = (
  props: {
    mediaList: any[]
  }
) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <h1 className="text-xl mb-4">Test Module Title</h1>
        <Button radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" size="sm">
          More
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          props.mediaList.map((item, index) =>
            <MediaCard key={item}></MediaCard>
          )
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
        className="w-full lg:w-[90%] border-none bg-background/60 dark:bg-default-100/50 mb-6"
        shadow="sm"
      >
        <CardHeader>
          <User
            name="施利TV"
            avatarProps={{
              className: 'flex-none w-[32px] h-[32px] mt-1 mr-1',
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            }}
          />
        </CardHeader>
        <CardBody className="overflow-hidden px-3 pb-3 pt-0">
          <div className="w-full gap-4 flex">
            <div className="flex-none">
              <Image
                shadow="sm"
                radius="lg"
                className="object-cover h-[160px] w-[250px]"
                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                alt="NextUI Album Cover" />
            </div>
            <div>
              <p className="text-lg line-clamp-2">ASMR Chinese Ancient Face Spa Treatment + Scalp Message</p>
              <p className="text-small text-foreground-400 mb-2">Product Design · 2K views · 3 years ago</p>
              <p className="text-small text-foreground-400 line-clamp-2">This is Meida Test Introduction gulugulugulu</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
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