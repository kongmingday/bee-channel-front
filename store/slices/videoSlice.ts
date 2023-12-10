import { SimpleVideo } from "@/types/media";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type videoSliceState = {
  currentVideoId?: string
}

const initialState: videoSliceState = {
  currentVideoId: undefined
}

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setCurrentVideoId: (state, action: PayloadAction<string>) => {
      state.currentVideoId = action.payload
    },
  }
})

export const { setCurrentVideoId } = videoSlice.actions

export const videoReducer = videoSlice.reducer