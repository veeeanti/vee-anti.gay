import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: Number.parseInt(params.id) },
    })
    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedPost = await prisma.blogPost.update({
      where: { id: Number.parseInt(params.id) },
      data: {
        title: body.title,
        slug: body.title?.toLowerCase().replace(/\s+/g, "-"),
        excerpt: body.excerpt,
        content: body.content,
        tags: body.tags,
        published: body.published,
      },
    })
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.blogPost.delete({
      where: { id: Number.parseInt(params.id) },
    })
    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
