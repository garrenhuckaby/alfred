import { NextRequest, NextResponse } from 'next/server'
import { getEmailProvider } from '@/lib/providers'

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const provider = getEmailProvider()
    await provider.deleteEmail(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete email' }, { status: 500 })
  }
}