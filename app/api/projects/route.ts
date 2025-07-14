
import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const where = category && category !== "all" ? { category } : undefined
    const projects = await prisma.project.findMany({
      where,
      orderBy: { created_at: "desc" },
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProject = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.title.toLowerCase().replace(/\s+/g, "-"),
        description: body.description,
        category: body.category,
        tags: body.tags,
        download_url: body.download_url,
        github_url: body.github_url,
        demo_url: body.demo_url,
        status: body.status || "active",
      },
    })
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
