/*
 * @Author: err0r
 * @Date: 2023-10-20 11:42:42
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-21 08:46:28
 * @Description: 
 * @FilePath: \bee-channel-front\store\index.ts
 */
import { configureStore } from '@reduxjs/toolkit'
import { menuReducer } from './slices/menuSlice'
import { videoReducer } from './slices/videoSlice'
import { liveReducer } from './slices/liveSlice'

const store = configureStore({
  reducer: {
    menu: menuReducer,
    video: videoReducer,
    live: liveReducer
  }
},)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
