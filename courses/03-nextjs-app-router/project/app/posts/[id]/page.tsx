import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
// params: The dynamic route parameter is available as params.id.
// fileBasedRouting: app/posts/[id]/page.tsx maps to /posts/:id.
// appDirectory: This route is defined inside the app/ directory.
// notFound: Missing posts use the Next.js 404 handler.
// errorTsx: Error handling is provided by error.tsx.
// generateMetadata: Generates metadata dynamically for each post.
// metadata: Provides title and description metadata.
// title: Post title is used as the page title.
// description: Post body is used as the page description.
// openGraph: Provides metadata for social sharing.

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

      <Link href="/posts">Back to Posts</Link>
    </main>
  );
}
