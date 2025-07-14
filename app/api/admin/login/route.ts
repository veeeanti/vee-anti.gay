import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return NextResponse.json({ error: "Server misconfiguration: missing admin secret." }, { status: 500 });
  }

  if (password === adminSecret) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "ACCESS_DENIED: Invalid credentials" }, { status: 401 });
  }
}
