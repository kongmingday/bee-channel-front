import { formDataPost, get } from "@/utils/common/fetchUtil";

const serviceName = process.env.NEXT_PUBLIC_MEDIA_SERVICE

export const uploadSingleFile = (file: FormData) => {
  return formDataPost(`/${serviceName}/file/upload/single`, file)
}

export const checkChunk = (chunkName: string) => {
  return get(
    `/${serviceName}/file/upload/chunk/check`,
    { chunkName }
  )
}

export const uploadChunk = (chunk: FormData) => {
  return formDataPost(`/${serviceName}/file/upload/chunk`, chunk)
}