import { NextResponse } from 'next/server'

type Post = {
  id: number
  title: string
  body: string
}

// routeHandler: App Router Route Handler for the /api/posts endpoint.
// getHandler: GET returns JSON data.
// jsonResponse: NextResponse.json provides the JSON response.

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