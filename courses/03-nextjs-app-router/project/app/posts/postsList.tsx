"use client";

import { useGetPostsQuery } from "../store/apiSlice";

// createApi: The API slice is created in store/apiSlice.ts.
// fetchBaseQuery: The API slice uses fetchBaseQuery.
// useQuery: useGetPostsQuery is a generated RTK Query query hook.
// useMutation: RTK Query supports generated mutation hooks.

export default function PostsList() {
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Unable to load posts.</p>;
  }

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <section>
      <h2>RTK Query Posts</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
