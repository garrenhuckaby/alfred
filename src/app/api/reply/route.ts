import { NextRequest, NextResponse } from 'next/server'
import { generateReply } from '@/lib/ai/generateReply'
import { getEmailProvider } from '@/lib/providers'

export async function POST(req: NextRequest) {
  try {
    const { id, subject, body, instruction } = await req.json()
    const replyBody = await generateReply(subject, body, instruction)
    const provider = getEmailProvider()
    await provider.sendReply(id, replyBody)
    return NextResponse.json({ success: true, replyBody })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 })
  }
}