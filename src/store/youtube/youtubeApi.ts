import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import localStorageProxy from '../../services/localStorageService';


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
    const values = params[param]
    if (values) {
      if (typeof values === 'object') {
        queryString += `${param}=${values.join(',')}&`
      } else {
        queryString += `${param}=${values}&`
      }
    }
  })
  return queryString
}

// Define an API service
export const youtubeApi = createApi({
  reducerPath: 'youtube',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube.googleapis.com/youtube/v3/',
    prepareHeaders: (headers, { getState }) => {
      //const state = getState() as AppState;
      const authToken = localStorageProxy.getItem('authToken');

      // If we have a token, set the Authorization header
      if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
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
      },
    })
  }),
});

export const { useGetPlaylistsQuery, useGetPlaylistItemsQuery } = youtubeApi;