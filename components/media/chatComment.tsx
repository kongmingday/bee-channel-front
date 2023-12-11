"use client";
import {
  Avatar, Button, Textarea, Link, Pagination,
  Popover, PopoverContent, PopoverTrigger,
  Divider, Spinner,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react"
import { useTheme } from "next-themes";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import React, { useRef, useState, Ref, useMemo, useEffect } from "react";
import { ClassValue } from "tailwind-variants";
import { calculateDuration } from "@/utils/common/memoFun";
import clsx from "clsx";

import { LikeIcon, SmileIcon, SortIcon, UnlikeIcon } from "../common/icons"
import InfiniteScroll from 'react-infinite-scroller'
import { SimpleVideo, Comment, ChildrenPlugin, ChildrenOpenTree, FavoriteParam } from "@/types/media";
import { PageParams, StoreFileHost } from "@/types";
import { getAuthInfo, getCurrentUserId, isExist } from "@/utils/common/tokenUtils";
import { commitComment, deleteComment, favoriteAction, getChildrenCommen, getCommentPage } from "@/api/media";
import { DeriveType, FavoriteType, OrderType } from "@/types/enum";
import { useRouter, useSearchParams } from "next/navigation";
import { favoriteDataPackaging } from "@/utils/media";
import { LoginPopover } from "../common/popover";

type CommentItemParam = {
  index?: number | string
  isChildren?: boolean
  childrenIndex?: number
  parentArrIndex?: number
}

const ChatCommentItem = (
  props: {
    refresh?: (parentArrIndex: number) => void,
    favoriteChange?: (
      data: Partial<FavoriteParam>,
      param: CommentItemParam
    ) => void,
    delComment?: (
      data: Partial<FavoriteParam>,
      param: CommentItemParam
    ) => void
    comment?: Comment,
    param: CommentItemParam
  }
) => {

  const router = useRouter()
  const [replyState, setReplyState] = useState(false)
  const goToUser = (userId: string) => { router.push(`/user/${userId}`) }
  const currentUserId = getCurrentUserId()

  const fromNow = useMemo(() => {
    return calculateDuration(props.comment?.createTime!)
  }, [props.comment?.createTime])

  const deleteCommentHandle = async () => {
    await deleteComment(props.comment?.id!).then(res => {
      if (res.result) {
        props.delComment!({
          sourceId: props.comment?.id
        }, {
          index: props.param.index,
          isChildren: props.param.isChildren,
          childrenIndex: props.param.childrenIndex,
          parentArrIndex: props.param.parentArrIndex
        })
      }
    })
  }

  const favoriteChangeHandle = (favroiteType: FavoriteType) => {
    if (!isExist()) {
      return;
    }
    props.favoriteChange!({
      favoriteType: favroiteType,
      sourceId: props.comment?.id,
      userToId: props.comment?.fromUser.id,
    }, props.param)
  }

  return (
    <>
      <div className="flex items-start gap-4 w-full mt-1">
        <Avatar
          className="flex-none mt-1"
          src={`${StoreFileHost}${props.comment?.fromUser.profile}`}
        />
        <div className="flex-col gap-1 w-full">
          <p className="text-secondary text-sm">
            <Link color="secondary"
              className="cursor-pointer"
              onClick={() => { goToUser(props.comment?.fromUser.id!) }}>
              {`${props.comment?.fromUser.username}`}
            </Link>
            <span className="text-default-500 ml-4">{fromNow}</span>
          </p>
          <div className="my-1">
            {
              props.comment?.toUser &&
              <Link className="mr-1 cursor-pointer"
                color="secondary"
                onClick={() => { goToUser(props.comment?.toUser.id!) }}>
                {`@${props.comment?.toUser.username}:`} &nbsp;
              </Link>
            }
            <span>{props.comment?.content}</span>
          </div>
          <div className="flex gap-4 items-center -translate-x-2">
            <div className="flex items-center justify-start">
              <LoginPopover>
                <Button radius="full" variant="light" isIconOnly>
                  <LikeIcon
                    onClick={() => { favoriteChangeHandle(FavoriteType.LIKE) }}
                    fill={props.comment?.favoriteType === FavoriteType.LIKE ? '#8c51c9' : undefined}
                    size={25} />
                </Button>
              </LoginPopover>
              <span>{props.comment?.likeCount}</span>
            </div>
            <LoginPopover>
              <Button variant="light" radius="full" isIconOnly>
                <UnlikeIcon
                  onClick={() => { favoriteChangeHandle(FavoriteType.UNLIKE) }}
                  fill={props.comment?.favoriteType === FavoriteType.UNLIKE ? '#8c51c9' : undefined}
                  size={25} />
              </Button>
            </LoginPopover>
            <Button variant="light" radius="full"
              onClick={() => { setReplyState(state => !state) }}>
              Reply
            </Button>
            {
              currentUserId == props.comment?.fromUser.id &&
              <Button variant="light" radius="full"
                onClick={() => { deleteCommentHandle() }}>
                Delete
              </Button>
            }
          </div>
          {
            replyState &&
            <CommentInput
              className="mt-2"
              refresh={() => {
                props.refresh!(
                  props.param.isChildren ?
                    props.param.parentArrIndex! : props.param.index! as number
                )
              }}
              parentId={props.param.isChildren ? props.param.index as string : props.comment?.id!}
              useToId={props.param.isChildren ? props.comment?.fromUser.id : undefined}
              deriveType={DeriveType.VIDEO} />
          }
        </div>
      </div>
    </>
  )
}

const ChatCommentList = (
  props: {
    orderBy: OrderType
    sourceId: string
  }
) => {

  const childrenPageSize = 5
  const [childrenPluginTree, setChildrenPluginTree] = useState<ChildrenPlugin>({})
  const [childrenOpenTree, setChildrenOpenTree] = useState<ChildrenOpenTree>({})
  const [commmentList, setCommentList] = useState<Comment[]>([])
  const [parentPageParam, setParentParam] = useState<PageParams>(new PageParams())
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1)

  const fetchParentNode = async (pageNo?: number, pageSize?: number) => {
    setIsLoading(true)
    await getCommentPage(
      props.sourceId!,
      pageNo || parentPageParam.pageNo,
      pageSize || parentPageParam.pageSize,
      props.orderBy
    ).then((res) => {
      const total = Number.parseInt(res.result.total)
      if (parentPageParam.pageNo * parentPageParam.pageSize >= total) {
        setHasMore(false)
      }
      if (pageNo) {
        setParentParam({ ...parentPageParam, pageNo: pageNo + 1 })
        setCommentList([...res.result.data])
        setHasMore(true)
      } else {
        setParentParam({ ...parentPageParam, pageNo: parentPageParam.pageNo + 1 })
        setCommentList([...commmentList, ...res.result.data])
      }
      let openTree: ChildrenOpenTree = {}
      let pluginTree: ChildrenPlugin = {}
      res.result.data.forEach((element: Comment) => {
        if (element.childrenCount > 0) {
          pluginTree[element.id] = {
            isLoading: false,
            data: []
          }
          openTree[element.id] = false
        }
      });
      setChildrenOpenTree(pre => {
        return { ...pre, ...openTree }
      })
      setChildrenPluginTree(pre => {
        return { ...pre, ...pluginTree }
      })
      setIsLoading(false)
    })

  }

  const fetchChildrenNode = async (sourceId: string, pageNo?: number) => {

    const pageParam = new PageParams(pageNo, childrenPageSize)
    setPageNo(pageParam.pageNo)

    setChildrenPluginTree(pre => {
      pre[sourceId].isLoading = true
      return pre
    })
    await getChildrenCommen(
      sourceId,
      pageParam
    ).then(res => {
      const { data } = res.result
      setChildrenPluginTree(pre => {
        pre[sourceId].data = data
        return { ...pre }
      })
    })

    setChildrenPluginTree(pre => {
      pre[sourceId].isLoading = false
      return pre
    })
  }

  const handleMoreReplyClick = (sourceId: string) => {
    setChildrenOpenTree(pre => {
      if (!pre[sourceId]) {
        fetchChildrenNode(sourceId)
      }
      pre[sourceId] = !pre[sourceId]
      return { ...pre }
    })
  }

  const favoriteChange = async ({
    favoriteType,
    sourceId,
    userToId
  }: Partial<FavoriteParam>, param: CommentItemParam) => {
    if (!isExist()) {
      return;
    }
    await favoriteAction({
      sourceId: sourceId!,
      deriveType: DeriveType.COMMENT,
      favoriteType: favoriteType!,
      userToId
    }).then(res => {
      if (res.result) {
        if (param.isChildren) {
          setChildrenPluginTree(pre => {
            const result = favoriteDataPackaging(
              pre[param.index!].data[param.childrenIndex!],
              favoriteType!
            )
            pre[param.index!].data[param.childrenIndex!] = result
            return { ...pre };
          })
        } else {
          setCommentList(pre => {
            const result = favoriteDataPackaging(pre[param.index! as number], favoriteType!)
            pre[param.index! as number] = result
            return [...pre];
          })
        }
      }
    })
  }

  const childrenClean = (sourceId: string) => {
    setChildrenPluginTree(pre => {
      delete pre[sourceId]
      return { ...pre }
    })
    setChildrenOpenTree(pre => {
      delete pre[sourceId]
      return { ...pre }
    })
  }

  const removeCommentNode = (
    data: Partial<FavoriteParam>,
    param: CommentItemParam
  ) => {
    if (param.isChildren) {
      let zeroFlag = false
      let childrenCount;
      setCommentList(pre => {
        pre[param.parentArrIndex as number].childrenCount -= 1
        childrenCount = pre[param.parentArrIndex as number].childrenCount
        zeroFlag = pre[param.parentArrIndex as number].childrenCount === 0
        return [...pre]
      })

      if (zeroFlag) {
        childrenClean(param.index! as string)
      } else if (childrenCount! % childrenPageSize === 0) {
        const targetPage = childrenCount! / childrenPageSize
        fetchChildrenNode(param.index! as string, targetPage)
      } else {
        setChildrenPluginTree(pre => {
          delete pre[param.index!].data[param.childrenIndex!]
          return { ...pre }
        })
      }
    } else {
      setCommentList(pre => {
        pre.splice(param.index! as number, 1)
        return [...pre]
      })
      childrenClean(data.sourceId!)
    }
  }

  const refreshChildrenComment = (parentArrIndex: number) => {
    const sourceId = commmentList[parentArrIndex].id
    if (childrenPluginTree[sourceId]) {
      setCommentList(pre => {
        pre[parentArrIndex].childrenCount += 1
        childrenOpenTree[sourceId] && fetchChildrenNode(pre[parentArrIndex].id)
        return [...pre]
      })
    } else {
      setCommentList(pre => {
        pre[parentArrIndex].childrenCount += 1
        return [...pre]
      })
      let openNode: ChildrenOpenTree = {}
      openNode[sourceId] = false
      let pluginNode: ChildrenPlugin = {}
      pluginNode[sourceId] = {
        isLoading: false,
        data: []
      }
      setChildrenOpenTree(pre => {
        return { ...pre, ...openNode }
      })
      setChildrenPluginTree(pre => {
        return { ...pre, ...pluginNode }
      })
    }
  }

  useEffect(() => {
    const { pageNo, pageSize } = new PageParams()
    setParentParam({ pageNo, pageSize })
    fetchParentNode(pageNo, pageSize)
  }, [props.orderBy])

  return (
    <div className="w-full">
      <InfiniteScroll
        loadMore={() => {
          if (!isLoading && hasMore) {
            fetchParentNode()
          }
        }}
        className="flex flex-col mt-6 gap-4 items-center w-full"
        hasMore={hasMore}
        loader={
          <Spinner
            label="loading"
            classNames={{
              base: "w-full"
            }}
            color="secondary" />
        }>
        {
          commmentList.map((item, index) =>
            <div className="w-full" key={index} >
              <ChatCommentItem
                refresh={refreshChildrenComment}
                comment={item} param={{ index }}
                delComment={removeCommentNode}
                favoriteChange={favoriteChange} />
              {
                item.childrenCount > 0 &&
                <Button className="ml-10 px-0 block text-default-500"
                  variant="light" radius="full"
                  onClick={() => { handleMoreReplyClick(item.id) }}>
                  {item.childrenCount} replies
                </Button>
              }
              {
                childrenOpenTree[item.id] &&
                <div className="ml-12">
                  {
                    childrenPluginTree[item.id].data.map((element, elementIndex) =>
                      <ChatCommentItem key={element.id}
                        refresh={refreshChildrenComment}
                        param={{
                          index: item.id,
                          isChildren: true,
                          childrenIndex: elementIndex,
                          parentArrIndex: index
                        }}
                        comment={element}
                        delComment={removeCommentNode}
                        favoriteChange={favoriteChange} />
                    )
                  }
                </div>
              }
              {
                childrenOpenTree[item.id] &&
                <Pagination
                  onChange={(page: number) => {
                    fetchChildrenNode(item.id, page)
                  }}
                  classNames={{
                    cursor: "bg-[#f2f2f2] text-secondary dark:bg-white ",
                    item: "bg-transparent"
                  }}
                  className="ml-12 mt-2"
                  page={pageNo}
                  total={Math.ceil(item.childrenCount / childrenPageSize)}
                  initialPage={1}
                  size="sm" />
              }
              <Divider className="mt-3 ml-12 w-[95%]" />
            </div>
          )
        }
        {
          !hasMore && (
            <div className="w-full mb-2 text-center">No more</div>
          )
        }
      </InfiniteScroll>
    </div>
  )
}


const CommentInput = (
  props: {
    refresh?: () => any,
    className?: ClassValue,
    deriveType: DeriveType,
    useToId?: string
    parentId?: string
  }
) => {

  const currentUser = getAuthInfo()
  const searchParams = useSearchParams()
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>()
  const [comment, setComment] = useState('')
  const videoId = searchParams.get('id')
  const handleEmojiChange = (emoji: any) => {
    if (!currentUser) {
      return;
    }

    const current = inputRef.current!
    const position = current.selectionStart!

    if (position == current.value.length) {
      setComment(pre => pre + emoji.native)
      current.focus()
      return;
    }
    const front = current.value.substring(0, position);
    const later = current.value.substring(position);
    setComment(front + emoji.native + later)
    current.focus()
    current.selectionStart = position + emoji.native.length
    current.selectionEnd = position + emoji.native.length
  }

  const handlerCommit = async () => {
    await commitComment({
      deriveId: videoId!,
      deriveType: props.deriveType,
      userToId: props.useToId,
      parentId: props.parentId,
      content: comment
    }).then(res => {
      if (res.result) {
        if (props.parentId) {
          props.refresh!()
        }
      }
    })
  }

  return (
    <div className={
      clsx("flex gap-4", props.className)
    }>
      {
        currentUser ? <Avatar
          className="flex-none"
          src={`${StoreFileHost}${currentUser.information?.profile}`} /> :
          <Avatar
            className="flex-none" name="No" />
      }
      <div className="flex-col flex-1 items-start">
        <Textarea
          isDisabled={currentUser === null}
          minRows={1}
          ref={inputRef as Ref<HTMLInputElement>}
          classNames={{
            label: "hidden"
          }}
          placeholder={
            currentUser === null ? 'Please login' : 'Add a comment'
          }
          value={comment}
          onValueChange={setComment}
        />
        <Popover
          placement="bottom-start"
          showArrow={true}>
          <PopoverTrigger>
            <Button size="sm"
              variant="light"
              isIconOnly>
              <SmileIcon size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Picker
              maxFrequentRows={0}
              perLine={12}
              data={data}
              previewConfig={{
                showPreview: false
              }}
              onEmojiSelect={handleEmojiChange}
              theme={theme.resolvedTheme} />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        onClick={() => { handlerCommit() }}
        color="primary">
        Commit
      </Button>
    </div>
  )
}


export const ChatComment = (
  props: {
    media?: SimpleVideo
  }
) => {

  const [sortBy, setSortBy] = useState<OrderType>(OrderType.HOT)

  return (
    <div className="flex-col ">
      <div className="flex items-center mb-2">
        <p className="text-lg">{props.media?.commentCount} Comments</p>
        <Dropdown
          classNames={{
            base: 'min-w-fit'
          }}>
          <DropdownTrigger>
            <Button className="bg-inherit text-md"><SortIcon />Sort by</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => { setSortBy(OrderType.HOT) }}>Top</DropdownItem>
            <DropdownItem onClick={() => { setSortBy(OrderType.TIME) }}>Newest</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <CommentInput deriveType={DeriveType.VIDEO} />
      <ChatCommentList sourceId={props.media?.id!} orderBy={sortBy} />
    </div>
  )
}