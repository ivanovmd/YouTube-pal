import { configureStore } from '@reduxjs/toolkit'
import { youtubeApi } from './youtube/youtubeApi'
import { playlistsMiddleware, youtubeSlice } from './youtube/youtubeSlice'
import { rtkQueryErrorLogger } from './rtkQueryErrorHandler'


export const store = configureStore({
  reducer: {
    youtube: youtubeSlice.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeApi.middleware, playlistsMiddleware, rtkQueryErrorLogger),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store