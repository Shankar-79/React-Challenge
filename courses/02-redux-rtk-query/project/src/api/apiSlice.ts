import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi } from "./mockServer";

interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
}

export interface Post {
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
    // =========================
    // GET USERS
    // =========================
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
              ...result.map((user) => ({
                type: "User" as const,
                id: user.id,
              })),
              {
                type: "User" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "User" as const,
                id: "LIST",
              },
            ],
    }),

    // =========================
    // GET POSTS
    // =========================
    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getPosts();

          return { data };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch posts",
            },
          };
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map((post) => ({
                type: "Post" as const,
                id: post.id,
              })),
              {
                type: "Post" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "Post" as const,
                id: "LIST",
              },
            ],
    }),

    // =========================
    // GET POST BY ID
    // =========================
    getPostById: builder.query<Post, number>({
      queryFn: async (id) => {
        try {
          const data = await mockApi.getPostById(id);

          return { data };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch post",
            },
          };
        }
      },

      providesTags: (_result, _error, id) => [
        {
          type: "Post",
          id,
        },
      ],
    }),

    // =========================
    // ADD POST
    // =========================
    addPost: builder.mutation<Post, Omit<Post, "id">>({
      queryFn: async (post) => {
        try {
          const newPost: Post = {
            id: Date.now(),
            ...post,
          };

          return {
            data: newPost,
          };
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

      invalidatesTags: [
        {
          type: "Post",
          id: "LIST",
        },
      ],

      // =========================
      // OPTIMISTIC UPDATE
      // =========================
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getPosts",
            undefined,
            (draft) => {
              draft.push({
                id: Date.now(),
                ...arg,
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

// =========================
// GENERATED HOOKS
// =========================

export const {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
} = apiSlice;