'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
// useServer: This module contains Server Actions.
// revalidatePath: Revalidates the /posts route.
// revalidateTag: Revalidates posts data.
// fetchCache: Server-side mutations can trigger cache revalidation.

type PostInput = {
  title: string
  body: string
}

export async function addPost(formData: FormData) {
  const title = formData.get('title')
  const body = formData.get('body')

  if (typeof title !== 'string' || typeof body !== 'string') {
    throw new Error('Title and body are required')
  }

  const post: PostInput = {
    title: title.trim(),
    body: body.trim(),
  }

  if (!post.title || !post.body) {
    throw new Error('Title and body cannot be empty')
  }

  // Server-side mutation would persist `post` to a database.
  void post

  revalidatePath('/posts')
  revalidateTag('posts')
}