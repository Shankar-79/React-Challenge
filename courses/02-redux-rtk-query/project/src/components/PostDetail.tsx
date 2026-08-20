import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../api/apiSlice";

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();

  const id = postId ? Number(postId) : undefined;

  const { data, isLoading, isError } = useGetPostByIdQuery(id as number, {
    skip: !id,
  });

  if (isLoading) {
    return <div data-testid="post-detail-loading">Loading post...</div>;
  }

  if (isError) {
    return <div data-testid="post-detail-error">Failed to load post.</div>;
  }

  if (!data) {
    return <div data-testid="post-detail-error">Post not found.</div>;
  }

  return (
    <div data-testid="post-detail">
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
}
