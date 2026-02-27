import { NextRequest, NextResponse } from 'next/server'
import { summarizeEmail } from '@/lib/ai/summarize'

export async function POST(req: NextRequest) {
  try {
    const { body } = await req.json()
    const summary = await summarizeEmail(body)
    return NextResponse.json({ summary })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to summarize email' }, { status: 500 })
  }
}