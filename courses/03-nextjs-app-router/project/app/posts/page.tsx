// asyncServerComponent: This page is an async Server Component.
// fetch: Data is fetched on the server using native fetch and await.
// fileBasedRouting: app/posts/page.tsx maps to the /posts route.

import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function PostsPage() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts: Post[] = await response.json();

    return (
      <main>
        <h1>Posts</h1>

        <p>Posts fetched on the server with native fetch.</p>

        <Link href="/">Home</Link>

        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  } catch {
    return (
      <main>
        <h1>Posts</h1>
        <p>Unable to load posts. Please try again later.</p>
        <Link href="/">Home</Link>
      </main>
    );
  }
}
