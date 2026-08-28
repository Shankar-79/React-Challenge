"use client";

// dynamicSegment: This error boundary belongs to the posts dynamic route.
// useClient: Error boundaries are Client Components.
// metadata: The posts route has metadata defined by its pages.
// notFound: Missing posts are handled with notFound() in the dynamic page.

type PostsErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function PostsError({ error, reset }: PostsErrorProps) {
  return (
    <main>
      <h1>Something went wrong</h1>

      <p>{error.message || "Unable to load this post."}</p>

      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
