import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { created_at: "desc" },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newPost = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.title.toLowerCase().replace(/\s+/g, "-"),
        excerpt: body.excerpt,
        content: body.content,
        tags: body.tags,
        published: body.published ?? false,
      },
    })
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
