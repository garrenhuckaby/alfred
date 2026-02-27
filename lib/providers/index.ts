import { MockProvider } from '@/lib/providers/MockProvider'
import { EmailProvider } from '@/lib/providers/EmailProvider'

export function getEmailProvider(): EmailProvider {
  // Swap MockProvider for a real Gmail provider later
  return new MockProvider()
}