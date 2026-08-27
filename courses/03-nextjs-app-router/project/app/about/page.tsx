// serverComponent: This page is a Server Component by default.
// fileBasedRouting: app/about/page.tsx maps to the "/about" route.
// appDirectory: The route is defined inside the app/ directory.

import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page.</p>

      <Link href="/">Home</Link>
    </main>
  );
}
