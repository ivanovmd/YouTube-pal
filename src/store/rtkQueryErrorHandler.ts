import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'

import { AppStore } from './store'
import localStorageProxy from '../services/localStorageService'

export const rtkQueryErrorLogger: Middleware =
  (store: AppStore) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        console.log('Unautorized')
        localStorageProxy.removeItem('authToken');
      }
    }

    return next(action)
  }