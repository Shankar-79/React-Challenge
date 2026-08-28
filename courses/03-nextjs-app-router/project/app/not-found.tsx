import Link from "next/link";

// dynamicSegment: This page handles missing resources from dynamic routes.
// useClient: Interactive behavior can be isolated into Client Components.
// metadata: Route metadata is defined by the App Router pages.
// notFound: This page is rendered when notFound() is called.

export default function NotFound() {
  return (
    <main>
      <h1>404 - Post Not Found</h1>

      <p>The post you are looking for does not exist.</p>

      <Link href="/posts">Back to Posts</Link>
    </main>
  );
}
