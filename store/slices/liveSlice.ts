import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type liveState = {
  roomId: string
  userId: string
}

const initialState: liveState = {
  roomId: '',
  userId: ''
}

const liveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload
    }
  }
})

export const { setUserId, setRoomId } = liveSlice.actions

export const liveReducer = liveSlice.reducer