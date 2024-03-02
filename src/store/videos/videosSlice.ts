
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DatabaseSliceCallers } from '../../infrastructure/database/callers';
import { dbSlices } from '../../infrastructure/database/constants';


export type VideoStatus = 'queued' | 'downloading' | 'downloaded' | 'failed'

export interface VideoData {
  id: string
  name: string
  url: string
  downloadPath: string
  status: VideoStatus
}



const videosCallers = new DatabaseSliceCallers(dbSlices.VIDEOS).getCallers();

const baseQuery = fetchBaseQuery({ baseUrl: '/' });

export const videosApi = createApi({
  reducerPath: 'videos',
  baseQuery,
  tagTypes: ['video'],
  endpoints: (builder) => ({
    addVideoForDownload: builder.query({
      providesTags: ['video'],
      queryFn: async (video: VideoData) => {
        return await videosCallers.insert(video)
      },
    }),
    getVideos: builder.query({
      providesTags: ['video'],
      queryFn: async () => {
        console.log('fetching videos');

        const videos = await videosCallers.find({})
        return { data: videos }
      },
    }),
    getVideo: builder.query({
      providesTags: (_, error, id) => {
        if (error || !id) {
          return ['video'];
        }
        return [{ type: 'video', id: id }];
      },
      queryFn: async (id: string) => {
        const response = await videosCallers.findOne({ id })
        return { data: response?.video }
      },
    }),
    updateVideoStatus: builder.mutation({
      invalidatesTags: (result, error, { id }) => {
        if (error) {
          return [];
        }
        return [{ type: 'video', id }];
      },
      queryFn: (status: VideoStatus, id) => {
        return videosCallers.update({ id }, status)
      },
    }),
  }),
});

export const {
  endpoints: {
    getVideos,
    getVideo,
    addVideoForDownload,
    updateVideoStatus
  },
  useGetVideosQuery,
  useGetVideoQuery,
  useUpdateVideoStatusMutation
} = videosApi;