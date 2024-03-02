
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DatabaseSliceCallers } from '../../infrastructure/database/callers';
import { dbSlices } from '../../infrastructure/database/constants';


export interface AppSettings {
  downloadPath: string
}

const appSettingsCallers = new DatabaseSliceCallers(dbSlices.APP_SETTINGS).getCallers();

const baseQuery = fetchBaseQuery({ baseUrl: '/' });

export const appSettingsApi = createApi({
  reducerPath: 'appSettings',
  baseQuery,
  tagTypes: ['settings'],
  endpoints: (builder) => ({
    getSettings: builder.query({
      providesTags: ['settings'],
      queryFn: async () => {
        const response = await appSettingsCallers.findOne({})
        return { data: response?.settings }
      },
    }),
    setSettings: builder.mutation({
      invalidatesTags: ['settings'],
      queryFn: (settings: AppSettings) => {
        return appSettingsCallers.insert({ settings })
      },
    }),
  }),
});

export const {
  endpoints: {
    setSettings
  }, useGetSettingsQuery, useSetSettingsMutation } = appSettingsApi;