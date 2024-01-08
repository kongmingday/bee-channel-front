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