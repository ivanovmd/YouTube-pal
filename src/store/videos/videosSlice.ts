
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
    getVideos: builder.query({
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'video' as const, id })),
            { type: 'video', id: 'LIST' },
          ]
          : [{ type: 'video', id: 'LIST' }],
      queryFn: async () => {
        const videos = await videosCallers.find({})
        console.log(videos);

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
    addVideoForDownload: builder.mutation({
      invalidatesTags: ['video'],
      queryFn: async (video: VideoData) => {
        return await videosCallers.insert(video)
      },
    }),
    updateVideoStatus: builder.mutation({
      invalidatesTags: (result, error, { id }) => {
        if (error) {
          return [];
        }
        return [{ type: 'video', id }];
      },
      queryFn: async ({ status, id }) => {
        const response = await videosCallers.update({ id }, { $set: { status } })
        return response
      },
    }),
  }),
});


export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoForDownloadMutation,
  useUpdateVideoStatusMutation
} = videosApi;