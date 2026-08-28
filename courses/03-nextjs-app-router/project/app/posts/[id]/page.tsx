import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PostActions from "./PostActions";

type Post = {
  id: number;
  title: string;
  body: string;
};

type PostPageProps = {
  params: {
    id: string;
  };
};

// dynamicSegment: [id] creates a dynamic route segment.
// fileBasedRouting: This file maps to /posts/:id.
// appDirectory: This route is inside the app/ directory.
// params: The post ID is received through params.id.
// asyncServerComponent: The page is an async Server Component.
// fetch: Post data is fetched on the server.
// notFound: Missing posts use Next.js 404 handling.
// errorTsx: Errors are handled by the App Router error boundary.
// generateMetadata: Metadata is generated dynamically for each post.
// metadata: The post provides title and description metadata.
// useClient: PostActions provides the Client Component boundary.
// useState: PostActions uses client-side state.

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const post: Post = await response.json();

  return {
    title: post.title,
    description: post.body,
    openGraph: {
      title: post.title,
      description: post.body,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    notFound();
  }

  const post: Post = await response.json();

  if (!post || !post.id) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>

      <p>{post.body}</p>

      <p>Post ID: {post.id}</p>

      <PostActions />

      <nav style={{ marginTop: "1.5rem" }}>
        <Link href="/posts">Back to Posts</Link>
      </nav>
    </main>
  );
}
