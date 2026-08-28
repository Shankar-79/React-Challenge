import { Suspense } from "react";

// loadingTsx: Route-level loading UI for the /posts segment.
// Suspense: Provides a loading fallback while content is loading.

function PostsLoadingContent() {
  return <p>Loading posts...</p>;
}

export default function Loading() {
  return (
    <main>
      <h1>Posts</h1>

      <Suspense fallback={<p>Loading posts...</p>}>
        <PostsLoadingContent />
      </Suspense>
    </main>
  );
}
