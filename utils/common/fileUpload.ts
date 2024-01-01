import qs from 'qs';
import SparkMD5 from "spark-md5"
import { getAuthToken } from "./tokenUtils"
import { Toast, ToastMode } from "@/components/common/toast"
import { checkChunk } from '@/api/upload';
import { uploadChunk as uploadChunkPost } from '@/api/upload';

const baseUrl = process.env.NEXT_PUBLIC_GATEWAY_HOST
const CHUNK_SIZE = 5 * 1024 * 1024
const spark = new SparkMD5()
let fileReader: FileReader
if (typeof window !== 'undefined') {
  fileReader = new FileReader()
}
let fileHash: string
let suffix: string

/**
 * @description: Create chunk by upload file
 * @param {File} file Require Upload File
 * @return {*}
 */
const createChunk = (file: File) => {
  let cur = 0
  let chunks = []
  chunks = []
  while (cur < file.size) {
    const blob = file.slice(cur, cur + CHUNK_SIZE);
    chunks.push(blob)
    cur += CHUNK_SIZE
  }

  return chunks
}


/**
 * @description: Caculate file's hash code
 * @return {Promise}
 */
const caculateHash = (chunks: Blob[]) => {
  return new Promise((resolve, reject) => {
    const targets: Blob[] = []

    // push the chunk chip
    chunks.forEach((chunk, index) => {
      if (index == 0 || index == chunks.length - 1) {
        targets.push(chunk)
      } else {
        targets.push(chunk.slice(0, 2))
        targets.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2))
        targets.push(chunk.slice(CHUNK_SIZE - 2, CHUNK_SIZE))
      }
    })

    // caculate the hash code
    fileReader.readAsArrayBuffer(new Blob(targets))
    fileReader.onload = (e) => {
      spark.append((e.target as FileReader).result as string)
      resolve(spark.end())
    }
  }).catch(error => {
    console.log(error)
    alert("File processing failure, please try again")
  })
}


/**
 * @description: Upload file chunks
 * @param {Blob} chunks file chunks
 * @return {*}
 */
const uploadChunk = async (chunks: Blob[]) => {

  // Organize the requierd file
  const data = chunks.map((chunk, index) => {
    return {
      fileHash,
      chunkHash: `${fileHash}-${index}`,
      chunk
    }
  })

  // Encapsulated data
  const formDatas = data.map(item => {
    const formData = new FormData()
    formData.append('fileHash', item.fileHash)
    formData.append('chunkHash', item.chunkHash)
    formData.append('chunk', item.chunk)
    formData.append('extension', suffix)
    return formData
  })

  // Define request pool， the maximum value of the pool is six
  const max = 6
  let index = 0
  const taskPool: Promise<Response>[] = []

  while (index < formDatas.length) {

    const { code, result } = await checkChunk(data[index].chunkHash + suffix)
    if (code === 200 && !result) {
      const task = uploadChunkPost(formDatas[index])
      task.then(() => {
        taskPool.splice(taskPool.findIndex(item => {
          item === task
        }))
      })

      taskPool.push(task)
      if (taskPool.length === max) {
        await Promise.race(taskPool)
      }
    }
    index++
  }

  const resArr = await Promise.all(taskPool)
  if (resArr.length === 1 && (resArr[0] as any).code !== 200) {
    Toast("the file upload has error")
  } else {
    
  }
}

const getFileSuffix: (fileName: string) => string | null = (fileName) => {
  const index = fileName.lastIndexOf(".")
  if (index === -1) {
    return null
  }
  return fileName.substring(index)
}

/**
 * @description: Upload file entry
 * @param {Event} e the input element of the file upload component
 * @return {*}
 */
export const handleUpload = async (e: HTMLInputElement) => {
  const files = e.files
  if (!files) {
    alert("please upload your file")
    return
  }

  const tempName = getFileSuffix(files[0].name)
  if (!tempName) {
    Toast("the file has error", ToastMode.DANGER)
  }

  suffix = tempName as string

  const chunks = createChunk(files[0])

  const hash = await caculateHash(chunks)
  fileHash = hash as string

  uploadChunk(chunks)

}