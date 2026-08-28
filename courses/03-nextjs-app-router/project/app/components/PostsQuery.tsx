"use client";

import { useGetPostsQuery } from "../store/apiSlice";

export default function PostsQuery() {
  const { data: posts, isLoading, isError, isFetching } = useGetPostsQuery();

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Unable to load posts.</p>;
  }

  return (
    <section>
      <h2>RTK Query Posts</h2>

      {isFetching && <p>Refreshing posts...</p>}

      {!posts || posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// useClient: RTK Query hooks run in Client Components.
// useGetPostsQuery: Generated RTK Query hook fetches posts.
// loading: Displays a loading state.
// error: Displays an error state.
