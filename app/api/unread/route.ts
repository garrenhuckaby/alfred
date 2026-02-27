import { NextResponse } from 'next/server'
import { getEmailProvider } from '@/lib/providers'

export async function GET() {
  try {
    const provider = getEmailProvider()
    const emails = await provider.getUnread()
    return NextResponse.json({ emails })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 })
  }
}