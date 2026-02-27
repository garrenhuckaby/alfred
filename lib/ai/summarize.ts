import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function summarizeEmail(body: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are Alfred, a helpful email assistant. Summarize emails concisely in 1-2 sentences.',
      },
      {
        role: 'user',
        content: `Summarize this email: ${body}`,
      },
    ],
  })

  return response.choices[0].message.content ?? 'No summary available.'
}