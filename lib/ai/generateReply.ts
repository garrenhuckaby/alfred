import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateReply(subject: string, body: string, instruction: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are Alfred, a professional email assistant. Write clear, concise email replies.',
      },
      {
        role: 'user',
        content: `Original email subject: ${subject}\nOriginal email body: ${body}\n\nInstruction for reply: ${instruction}`,
      },
    ],
  })

  return response.choices[0].message.content ?? 'Unable to generate reply.'
}