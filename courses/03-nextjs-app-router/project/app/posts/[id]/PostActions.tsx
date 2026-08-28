"use client";

import { useState } from "react";

// useClient: This component handles browser interaction.
// useState: Client-side state is used for the like interaction.
// functionalComponent: This is a Client Component function.

export default function PostActions() {
  const [liked, setLiked] = useState(false);

  return (
    <section style={{ marginTop: "1.5rem" }}>
      <button type="button" onClick={() => setLiked((current) => !current)}>
        {liked ? "Unlike Post" : "Like Post"}
      </button>

      <p>
        {liked ? "You liked this post." : "You have not liked this post yet."}
      </p>
    </section>
  );
}
