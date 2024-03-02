import { configureStore } from '@reduxjs/toolkit'
import { youtubeApi } from './youtube/youtubeApi'
import { youtubeSlice } from './youtube/youtubeSlice'
import { rtkQueryErrorLogger } from './rtkQueryErrorHandler'
import { appSettingsApi } from './appSettings/appSettingsSlice'
import { useDispatch } from 'react-redux'
import { videosApi } from './videos/videosSlice'


export const store = configureStore({
  reducer: {
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    [appSettingsApi.reducerPath]: appSettingsApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      youtubeApi.middleware,
      appSettingsApi.middleware,
      videosApi.middleware,
      rtkQueryErrorLogger),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch: () => AppDispatch = useDispatch