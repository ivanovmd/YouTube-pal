import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const downloadQueueSlice = createSlice({
  name: 'downloadQueue',
  initialState: {
    downloadQueue: []
  },
  reducers: {
    addToDownloadQueue: (state, action: PayloadAction<any>) => {
      state.downloadQueue.push(action.payload)
    }
  }
})