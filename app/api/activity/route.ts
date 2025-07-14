import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Use a raw SQL query to get recent activity (see scripts/create-activity-view.sql)
    const result = await prisma.$queryRawUnsafe<any[]>(
      `SELECT * FROM recent_activity ORDER BY timestamp DESC LIMIT 10`
    )
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 })
  }
}
