import { NextRequest, NextResponse } from 'next/server'
import { transcribeAudio } from '@/lib/ai/transcribe'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('audio') as Blob
    const buffer = Buffer.from(await file.arrayBuffer())
    const text = await transcribeAudio(buffer)
    return NextResponse.json({ text })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 })
  }
}