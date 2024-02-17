import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppState } from '../store';

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
      query: () => `playlists?part=contentDetails,id&mine=true`,
    }),
  }),
});

export const { useGetPlaylistsQuery } = youtubeApi;