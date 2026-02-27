import OpenAI from 'openai'
import { Readable } from 'stream'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const readable = Readable.from(audioBuffer) as any
  readable.name = 'audio.webm'

  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: readable,
  })

  return response.text
}