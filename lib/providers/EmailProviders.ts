import { Email } from '@/types/email'

export interface EmailProvider {
  getUnread(): Promise<Email[]>
  sendReply(id: string, body: string): Promise<void>
  deleteEmail(id: string): Promise<void>
}