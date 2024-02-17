import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface AuthState {
  authToken: string
}

const initialState: AuthState = {
  authToken: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload
    },
    removeAuthToken: (state) => {
      state.authToken = ""
    },
  },
})

export const { setAuthToken, removeAuthToken } = authSlice.actions