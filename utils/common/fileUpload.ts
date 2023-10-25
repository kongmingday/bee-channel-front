/*
 * @Author: err0r
 * @Date: 2023-10-19 16:48:53
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-20 00:21:42
 * @Description: File Upload Utils
 * @FilePath: \bee-channel-front\utils\common\fileUpload.ts
 */

import SparkMD5 from "spark-md5"

const CHUNK_SIZE = 5 * 1024 * 1024
const spark = new SparkMD5()
const fileReader = new FileReader()
let fileHash: string
let fileName: string

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
      spark.append((e.target as FileReader).result)
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
      index,
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
    return formData
  })

  // Define request pool， the maximum value of the pool is six
  const max = 6
  let index = 0
  const taskPool: Promise<Response>[] = []

  while (index < formDatas.length) {
    const task = fetch("/upload", {
      method: "POST",
      body: formDatas[index]
    })

    taskPool.splice(taskPool.findIndex(item => {
      item === task
    }))

    taskPool.push(task)
    if (taskPool.length === max) {
      await Promise.race(taskPool)
    }
    index++
    
  }

  await Promise.all(taskPool)
}

/**
 * @description: Upload file entry
 * @param {Event} e the input element of the file upload component
 * @return {*}
 */
const handleUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) {
    alert("please upload your file")
    return
  }
  fileName = files[0].name

  const chunks = createChunk(files[0])

  const hash = await caculateHash(chunks)
  fileHash = hash as string

  uploadChunk(chunks)

}