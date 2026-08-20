import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi } from "./mockServer";

interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),

  tagTypes: ["User", "Post"],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getUsers();
          return { data };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch users",
            },
          };
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),

    addPost: builder.mutation<Post, Omit<Post, "id">>({
      queryFn: async (post) => {
        try {
          const newPost = {
            id: Date.now(),
            ...post,
          };

          return { data: newPost };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to add post",
            },
          };
        }
      },

      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddPostMutation,
} = apiSlice;