import Link from "next/link";

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

// dynamicSegment: The [id] folder creates a dynamic route segment.
// params: The dynamic route parameter is available as params.id.
// fileBasedRouting: app/posts/[id]/page.tsx maps to /posts/:id.
// appDirectory: This route is defined inside the app/ directory.
export default async function PostPage({ params }: PostPageProps) {
  const postId = params.id;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return (
        <main>
          <h1>Post Not Found</h1>
          <p>No post was found for ID {postId}.</p>
          <Link href="/posts">Back to Posts</Link>
        </main>
      );
    }

    const post: Post = await response.json();

    return (
      <main>
        <h1>{post.title}</h1>

        <p>{post.body}</p>

        <p>Post ID: {post.id}</p>

        <Link href="/posts">Back to Posts</Link>
      </main>
    );
  } catch {
    return (
      <main>
        <h1>Unable to Load Post</h1>
        <p>There was a problem loading post {postId}.</p>
        <Link href="/posts">Back to Posts</Link>
      </main>
    );
  }
}
