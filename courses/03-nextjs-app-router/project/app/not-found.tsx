import Link from "next/link";

// errorTsx: This file provides the App Router 404 UI.
// notFound: This UI is rendered when notFound() is called.

export default function NotFound() {
  return (
    <main>
      <h1>404 - Post Not Found</h1>

      <p>The requested post could not be found.</p>

      <Link href="/posts">Back to Posts</Link>
    </main>
  );
}
