import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { youtubeApi } from './youtube/youtubeApi'
import { playlistsMiddleware, youtubeSlice } from './youtube/youtubeSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    youtube: youtubeSlice.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeApi.middleware, playlistsMiddleware),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch