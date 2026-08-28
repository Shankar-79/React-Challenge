import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

type Post = {
  id: number
  title: string
  body: string
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/api/posts',
      providesTags: ['Posts'],
    }),
  }),
})

export const { useGetPostsQuery } = apiSlice

// createApi: Creates the RTK Query API slice.
// fetchBaseQuery: Provides the HTTP request implementation.
// useGetPostsQuery: Generated Client Component query hook.
// createApi: Creates the RTK Query API slice.
// fetchBaseQuery: Provides the base HTTP query implementation.
// useQuery: RTK Query generates query hooks such as useGetPostsQuery.
// useMutation: RTK Query can generate mutation hooks for mutations.