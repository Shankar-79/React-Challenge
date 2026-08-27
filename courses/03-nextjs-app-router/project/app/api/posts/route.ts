import { NextResponse } from 'next/server'

// routeHandler: App Router Route Handler for /api/posts.
// ResponseJson: The handler returns JSON using NextResponse.json.
// GET: Handles GET requests for the posts endpoint.

type Post = {
  id: number
  title: string
  body: string
}

const posts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    body: 'Learn the fundamentals of the Next.js App Router.',
  },
  {
    id: 2,
    title: 'Server Components',
    body: 'Server Components allow data fetching directly on the server.',
  },
  {
    id: 3,
    title: 'Route Handlers',
    body: 'Route Handlers provide API endpoints inside the App Router.',
  },
]

export async function GET() {
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const post: Omit<Post, 'id'> = await request.json()

  const newPost: Post = {
    id: posts.length + 1,
    ...post,
  }

  return NextResponse.json(newPost, { status: 201 })
}