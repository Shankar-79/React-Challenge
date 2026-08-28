"use client";
// useServer: This Client Component invokes a Server Action.
// revalidatePath: The invoked Server Action revalidates /posts.
// revalidateTag: The invoked Server Action revalidates the posts tag.
import { useState } from "react";

type AddPostAction = (formData: FormData) => Promise<void>;

type AddPostFormProps = {
  action: AddPostAction;
};

export default function AddPostForm({ action }: AddPostFormProps) {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    try {
      await action(formData);
      setMessage("Post added successfully!");
    } catch {
      setMessage("Unable to add post.");
    }
  }

  return (
    <section>
      <h2>Add Post</h2>

      <form action={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required />
        </div>

        <div>
          <label htmlFor="body">Body</label>
          <textarea id="body" name="body" required />
        </div>

        <button type="submit">Add Post</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}
