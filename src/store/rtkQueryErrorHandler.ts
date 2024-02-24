import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import { removeAuthToken } from './auth/authSlice'
import { AppStore } from './store'
import { reactLocalStorage } from 'reactjs-localstorage'

export const rtkQueryErrorLogger: Middleware =
  (store: AppStore) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        console.log('Unautorized')
        //store.dispatch(removeAuthToken())
        reactLocalStorage.set('authToken', null);
      }
    }

    return next(action)
  }