import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppState } from '../store';




type part = 'contentDetails' | 'id' | 'localizations' | 'player' | 'snippet' | 'status'

interface YouTubeQueryParams {
  part?: part[]
  maxResults?: number
  pageToken?: string
}

const buildQueryParams = (params?: YouTubeQueryParams): string => {
  // setting the default values
  params = { maxResults: 50, part: ['contentDetails', 'id', 'snippet'], ...params }
  let queryString = ''
  Object.keys(params).map(param => {
    if (params[param]) {
      if (typeof params[param] === 'object') {
        queryString += `${param}=${params[param].join(',')}&`
      } else {
        queryString += `${param}=${params[param]}&`
      }
    }
  })
  return queryString
}

// Define an API service
export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube.googleapis.com/youtube/v3/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as AppState;
      const token = state.auth.authToken;

      // If we have a token, set the Authorization header
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPlaylists: builder.query({
      // Assume you have an API key and playlistId
      query: ({ pageToken }) => {
        const queryParams = buildQueryParams({ pageToken })
        return `playlists?mine=true&` + queryParams
      },
    }),
    getPlaylistItems: builder.query({
      query: ({ playlistId, pageToken }) => {
        const queryParams = buildQueryParams({ pageToken })
        return 'playlistItems?playlistId=' + playlistId + '&' + queryParams
      }
    })
  }),
});

export const { useGetPlaylistsQuery, useGetPlaylistItemsQuery } = youtubeApi;