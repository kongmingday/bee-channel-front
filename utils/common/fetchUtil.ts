/*
 * @Author: err0r
 * @Date: 2023-11-20 22:43:26
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-22 00:16:02
 * @Description: 
 * @FilePath: \bee-channel-front\utils\common\fetchUtil.ts
 */
import qs from 'qs';
import { getAuthToken, removeAuthToken } from './tokenUtils';
import { Toast, ToastMode } from '@/components/common/toast';

type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE'

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "No Authentication";
  }
}

const baseUrl = "http://localhost:8160"

export const get = (
  url: string,
  params?: any,
  headers?: any
) => {
  return request(url, 'GET', params, headers)
}

export const post = (
  url: string,
  data?: any,
  params?: any,
  headers?: any,
) => {
  return request(`${url}?${qs.stringify(params)}`, 'POST', data, headers)
}

export const put = (
  url: string,
  data?: any,
  params?: any,
  headers?: any,
) => {
  return request(`${url}?${qs.stringify(params)}`, 'PUT', data, headers)
}

export const del = (
  url: string,
  data?: any,
  params?: any,
  headers?: any,
) => {
  return request(`${url}?${qs.stringify(params)}`, 'DELETE', data, headers)
}

export const request = (
  url: string,
  method?: HTTP_METHOD,
  data?: any,
  headers?: any,
) => {

  const authToken = getAuthToken() || ''

  const options = {
    method: method || 'GET',
    headers: {
      'Authorization': authToken,
      'Content-Type': 'application/json',
      ...headers
    },
    body: method === 'GET' ? null : JSON.stringify(data)
  }

  url = `${baseUrl}${url}`
  if (method === 'GET') {
    url = `${url}?${qs.stringify(data)}`
  }
  const result = fetch(url, options).then((response) => {
    if (response.status === 401) {
      throw new AuthenticationError('The account or password is incorrect')
    }
    if (response.status !== 200) {
      throw new Error('Something error')
    }
    return response.json()
  }).catch(error => {
    console.log(error + "wsedasoiuidhasoihd")
    if (error instanceof SyntaxError) {
      return 'no response data'
    } else if (error instanceof AuthenticationError) {
      Toast(error.message, ToastMode.ERROE)
      removeAuthToken()
    } else {
      Toast(error.message, ToastMode.ERROE)
      return;
    }
  })
  return result
}
