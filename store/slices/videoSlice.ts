import { SimpleVideo } from "@/types/media";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type videoSliceState = {
  currentVideo?: SimpleVideo
}

const initialState: videoSliceState = {
  currentVideo: undefined
}

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<SimpleVideo>) => {
      state.currentVideo = action.payload
    },
  }
})

export const { setCurrentVideo } = videoSlice.actions

export const videoReducer = videoSlice.reducer