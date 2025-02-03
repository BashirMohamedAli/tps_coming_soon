import { NextResponse } from "next/server"

export async function GET() {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 10)
  return NextResponse.json({ targetDate: targetDate.toISOString() })
}
