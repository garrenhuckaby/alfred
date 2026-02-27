import { Email } from '@/types/email'
import { EmailProvider } from './EmailProvider'
import { mockEmails } from '@/data/mockEmails'

let emails = [...mockEmails]

export class MockProvider implements EmailProvider {
  async getUnread(): Promise<Email[]> {
    return emails.filter((e) => !e.read)
  }

  async sendReply(id: string, body: string): Promise<void> {
    console.log(`[MockProvider] Replying to email ${id}: ${body}`)
  }

  async deleteEmail(id: string): Promise<void> {
    emails = emails.filter((e) => e.id !== id)
    console.log(`[MockProvider] Deleted email ${id}`)
  }
}