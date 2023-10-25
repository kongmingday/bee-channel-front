/*
 * @Author: err0r
 * @Date: 2023-10-20 12:16:04
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-20 13:35:16
 * @Description: 
 * @FilePath: \bee-channel-front\store\hooks.ts
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '.'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 