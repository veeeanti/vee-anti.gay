
import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number.parseInt(params.id) },
    })
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedProject = await prisma.project.update({
      where: { id: Number.parseInt(params.id) },
      data: {
        title: body.title,
        slug: body.title?.toLowerCase().replace(/\s+/g, "-"),
        description: body.description,
        category: body.category,
        tags: body.tags,
        download_url: body.download_url,
        github_url: body.github_url,
        demo_url: body.demo_url,
        status: body.status,
      },
    })
    return NextResponse.json(updatedProject)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({
      where: { id: Number.parseInt(params.id) },
    })
    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
