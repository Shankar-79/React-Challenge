import { useMemo } from "react";
import { useGetPostsQuery } from "../api/apiSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSortBy } from "../store/slices/filtersSlice";

export default function PostsWithFilters() {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  const sortBy = useAppSelector((state) => state.filters.sortBy);
  const dispatch = useAppDispatch();

  const sortedPosts = useMemo(() => {
    const result = [...posts];

    if (sortBy === "newest") {
      return result.sort((a, b) => b.id - a.id);
    }

    return result.sort((a, b) => a.id - b.id);
  }, [posts, sortBy]);

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (isError) {
    return <div>Failed to load posts.</div>;
  }

  return (
    <div data-testid="posts-with-filters">
      <h2>Posts</h2>

      <div data-testid="filter-controls">
        <label htmlFor="sort-by">Sort by: </label>

        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) =>
            dispatch(setSortBy(event.target.value as "newest" | "oldest"))
          }
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <ul>
        {sortedPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
