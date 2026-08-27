// fileBasedRouting: app/page.tsx maps to the "/" route.
// appDirectory: This page is defined inside the app/ directory.
// serverComponent: This page is a Server Component by default.
// useClient: The client boundary is isolated in Counter.tsx.
// useState: State belongs in the Client Component, not this page.

import Link from "next/link";
import ChallengeList from "./components/ChallengeList";
import Counter from "./components/counter";

export default function Home() {
  return (
    <main>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Next.js App Router Project</h1>

        <p>Complete the challenges to build your Next.js skills!</p>

        <p style={{ color: "#666", marginTop: "0.5rem" }}>
          Work on challenges by modifying code in <code>app/</code> directory.
          Run <code>npm run dev</code> to see your changes.
        </p>

        <nav style={{ marginTop: "1rem" }}>
          <Link href="/about">About</Link>
          {" | "}
          <Link href="/posts">Posts</Link>
        </nav>
      </header>

      <Counter />

      <ChallengeList />
    </main>
  );
}
