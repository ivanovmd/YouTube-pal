import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DatabaseSliceCallers } from '../../infrastructure/database/callers';
import { dbSlices } from '../../infrastructure/database/constants';

const authTokenCallers = new DatabaseSliceCallers(dbSlices.AUTH_TOKEN).getCallers();


export const fetchAuthToken = createAsyncThunk(
  'auth/fetchAuthToken',
  async (_, { rejectWithValue }) => {
    try {
      const tokenResonse = await authTokenCallers.findOne({})
      return tokenResonse.authToken
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export interface AuthState {
  authToken: string
  status: string
  error: string
}

const initialState: AuthState = {
  authToken: '',
  status: '',
  error: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload
      authTokenCallers.insert({ authToken: action.payload })
    },
    removeAuthToken: (state) => {
      state.authToken = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthToken.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAuthToken.fulfilled, (state, action) => {
        state.authToken = action.payload;
      })
      .addCase(fetchAuthToken.rejected, (state, action) => {
        state.authToken = ''
      });
  },
})

export const { setAuthToken, removeAuthToken } = authSlice.actions