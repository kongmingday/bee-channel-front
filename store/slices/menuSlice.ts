/*
 * @Author: err0r
 * @Date: 2023-10-20 11:43:48
 * @LastEditors: err0r
 * @LastEditTime: 2023-10-24 22:16:11
 * @Description: 
 * @FilePath: \bee-channel-front\store\slices\menuSlice.ts
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type menuState = {
  isOpen: boolean,
  isFixed: boolean
}

const initialState: menuState = {
  isOpen: false,
  isFixed: false
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeOpenState: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    changeFixedState: (state, action: PayloadAction<boolean>) => {
      state.isFixed = action.payload
    }
  }
})

export const { changeOpenState, changeFixedState } = menuSlice.actions

export const menuReducer = menuSlice.reducer