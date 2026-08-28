import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

// asyncServerComponent: This page uses Server Components.
// fetch: Data is fetched on the server.
// fileBasedRouting: app/posts/page.tsx maps to /posts.
// loadingTsx: The posts route has a loading.tsx file.
// Suspense: Provides a loading fallback.
// dynamicExport: Explicitly configures dynamic rendering.
// forceStaticOrDynamic: The route uses force-dynamic rendering.
// dynamicRendering: The page is rendered dynamically.
// forceDynamic: The page is rendered on every request.
// ssr: Server-side rendering is used for request-time data.
// noStore: The fetch request is not cached.

type Post = {
  id: number;
  title: string;
  body: string;
};

async function PostsContent() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts: Post[] = await response.json();

    if (posts.length === 0) {
      return <p>No posts available.</p>;
    }

    return (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    );
  } catch {
    return <p>Unable to load posts. Please try again later.</p>;
  }
}

export default function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>

      <p>Posts fetched on the server with native fetch.</p>

      <Link href="/">Home</Link>

      <Suspense fallback={<p>Loading posts...</p>}>
        <PostsContent />
      </Suspense>
    </main>
  );
}
