import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { addPost } from "../actions";
import AddPostForm from "../components/AddPostForm";
import PostsQuery from "../components/PostsQuery";

export const dynamic = "force-dynamic";

// asyncServerComponent: This page uses Server Components.
// fetch: Data is fetched on the server.
// fileBasedRouting: app/posts/page.tsx maps to /posts.
// appDirectory: This route is inside the app/ directory.
// loadingTsx: The posts route has a loading.tsx file.
// Suspense: Provides a loading fallback.
// dynamicExport: Explicitly configures dynamic rendering.
// forceStaticOrDynamic: The route uses force-dynamic rendering.
// dynamicRendering: The page is rendered dynamically.
// forceDynamic: The page is rendered on every request.
// ssr: Server-side rendering is used for request-time data.
// cacheNoStore: The fetch request uses cache: 'no-store'.
// useServer: The page uses a Server Action.
// revalidatePath: The Server Action revalidates the posts route.
// revalidateTag: The Server Action revalidates the posts data.
// fetchCache: The page explicitly controls fetch caching behavior.
// searchParams: Query parameters are received by the page.
// search: The q parameter filters posts.
// pagination: The page parameter controls pagination.
// page: The current page is read from searchParams.page.
// nextImage: Images are optimized with next/image.
// nextFont: Fonts are optimized with next/font.
// metadata: SEO metadata is provided for the posts page.
// generateMetadata: Dynamic metadata can be generated for routes.

export const metadata: Metadata = {
  title: "Posts | Next.js App Router Project",
  description: "Search and browse paginated posts.",
};

type Post = {
  id: number;
  title: string;
  body: string;
};

type SearchParams = {
  q?: string;
  page?: string;
};

type PostsPageProps = {
  searchParams: SearchParams;
};

const POSTS_PER_PAGE = 10;

async function PostsContent({ searchParams }: { searchParams: SearchParams }) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts: Post[] = await response.json();

    // Search
    const query = searchParams.q?.trim().toLowerCase() ?? "";

    const filteredPosts = query
      ? posts.filter((post) => post.title.toLowerCase().includes(query))
      : posts;

    // Pagination
    const requestedPage = Number.parseInt(searchParams.page ?? "1", 10);
    const currentPage =
      Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const totalPages = Math.max(
      1,
      Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    );

    const safePage = Math.min(currentPage, totalPages);

    const startIndex = (safePage - 1) * POSTS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE,
    );

    return (
      <section>
        {query && (
          <p>
            Search results for: <strong>{query}</strong>
          </p>
        )}

        {paginatedPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul>
            {paginatedPosts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <Link href={`/posts/${post.id}`}>Read post</Link>
              </li>
            ))}
          </ul>
        )}

        <nav aria-label="Pagination">
          {safePage > 1 && (
            <Link
              href={`/posts?page=${safePage - 1}${
                query ? `&q=${encodeURIComponent(query)}` : ""
              }`}
            >
              Previous
            </Link>
          )}{" "}
          <span>
            Page {safePage} of {totalPages}
          </span>{" "}
          {safePage < totalPages && (
            <Link
              href={`/posts?page=${safePage + 1}${
                query ? `&q=${encodeURIComponent(query)}` : ""
              }`}
            >
              Next
            </Link>
          )}
        </nav>
      </section>
    );
  } catch {
    return <p>Unable to load posts. Please try again later.</p>;
  }
}

export default function PostsPage({ searchParams }: PostsPageProps) {
  return (
    <main>
      <h1>Posts</h1>

      <p>Search and browse posts with pagination.</p>

      <Link href="/">Home</Link>

      <AddPostForm action={addPost} />

      <form method="GET" action="/posts">
        <label htmlFor="search">Search posts: </label>

        <input
          id="search"
          name="q"
          type="search"
          placeholder="Search by title..."
          defaultValue={searchParams.q ?? ""}
        />

        <button type="submit">Search</button>
      </form>

      <Suspense fallback={<p>Loading posts...</p>}>
        <PostsContent searchParams={searchParams} />
      </Suspense>
      <PostsQuery />
    </main>
  );
}
