import SparkMD5 from 'spark-md5';
import { Toast, ToastMode } from '@/components/common/toast';
import { checkChunk, checkFile, mergeChunk } from '@/api/upload';
import { uploadChunk as uploadChunkPost } from '@/api/upload';
import { FileUploadResult } from '@/types/media';

const baseUrl = process.env.NEXT_PUBLIC_GATEWAY_HOST;
const CHUNK_SIZE = 5 * 1024 * 1024;
const spark = new SparkMD5();
let fileReader: FileReader;
if (typeof window !== 'undefined') {
	fileReader = new FileReader();
}
let fileHash: string;
let suffix: string;

/**
 * @description: Create chunk by upload file
 * @param {File} file Require Upload File
 * @return {*}
 */
const createChunk = (file: File) => {
	let cur = 0;
	let chunks = [];
	chunks = [];
	while (cur < file.size) {
		const blob = file.slice(cur, cur + CHUNK_SIZE);
		chunks.push(blob);
		cur += CHUNK_SIZE;
	}

	return chunks;
};

/**
 * @description: Caculate file's hash code
 * @return {Promise}
 */
const caculateHash = (chunks: Blob[]) => {
	return new Promise((resolve, reject) => {
		const targets: Blob[] = [];

		// push the chunk chip
		chunks.forEach((chunk, index) => {
			if (index == 0 || index == chunks.length - 1) {
				targets.push(chunk);
			} else {
				targets.push(chunk.slice(0, 2));
				targets.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2));
				targets.push(chunk.slice(CHUNK_SIZE - 2, CHUNK_SIZE));
			}
		});

		// caculate the hash code
		fileReader.readAsArrayBuffer(new Blob(targets));
		fileReader.onload = e => {
			spark.append((e.target as FileReader).result as string);
			resolve(spark.end());
		};
	}).catch(error => {
		console.log(error);
		alert('File processing failure, please try again');
	});
};

/**
 * @description: Upload file chunks
 * @param {Blob} chunks file chunks
 * @return {*}
 */
const uploadChunk = async (
	chunks: Blob[],
	setProcessPercent: (finishPercent: number) => void,
	setVideoUploadResult: (result: FileUploadResult) => void,
) => {
	const checkFileData = await checkFile(fileHash, suffix);
	if (checkFileData.code === 200) {
		setProcessPercent(100);
		setVideoUploadResult(checkFileData.result);
		return;
	}

	// Organize the requierd file
	const data = chunks.map((chunk, index) => {
		return {
			fileHash,
			index,
			chunk,
		};
	});

	// Encapsulated data
	const formDatas = data.map(item => {
		const formData = new FormData();
		formData.append('fileHash', item.fileHash);
		formData.append('index', item.index.toString());
		formData.append('chunk', item.chunk);
		return formData;
	});

	// Define request pool， the maximum value of the pool is six
	const max = 6;
	let index = 0;
	const taskPool: Promise<Response>[] = [];

	while (index < formDatas.length) {
		const { code, result } = await checkChunk(fileHash, data[index].index);
		if (code === 200 && !result) {
			const task = uploadChunkPost(formDatas[index]);

			// dynamic process display and remove its from taksPoll
			task.then(() => {
				taskPool.splice(
					taskPool.findIndex(item => {
						item === task;
					}),
				);
				setProcessPercent(90 * (1 / formDatas.length));
			});
			taskPool.push(task);
			if (taskPool.length === max) {
				await Promise.race(taskPool);
			}
		} else {
			setProcessPercent(90 * (1 / formDatas.length));
		}
		index++;
	}

	const resArr = await Promise.all(taskPool);
	if (resArr.length === 1 && (resArr[0] as any).code !== 200) {
		Toast('the file upload has error');
		return;
	}

	const mergeChunkData = await mergeChunk(fileHash, formDatas.length);
	if (mergeChunkData.code === 200) {
		setProcessPercent(10);
		setVideoUploadResult(mergeChunkData.result);
	} else {
		Toast('the file upload has error');
	}
};

const getFileSuffix: (fileName: string) => string | null = fileName => {
	const index = fileName.lastIndexOf('.');
	if (index === -1) {
		return null;
	}
	return fileName.substring(index);
};

/**
 * @description: Upload file entry
 * @param {Event} e the input element of the file upload component
 * @return {*}
 */
export const handleUpload = async (
	e: HTMLInputElement,
	callback: (finishPercent: number) => void,
	setVideoUploadResult: (result: FileUploadResult) => void,
) => {
	const files = e.files;
	if (!files) {
		alert('please upload your file');
		return;
	}

	const tempName = getFileSuffix(files[0].name);
	if (!tempName) {
		Toast('the file has error', ToastMode.DANGER);
	}

	suffix = tempName as string;

	const chunks = createChunk(files[0]);

	const hash = await caculateHash(chunks);
	fileHash = hash as string;

	uploadChunk(chunks, callback, setVideoUploadResult);
};
