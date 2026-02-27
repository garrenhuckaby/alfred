import { MockProvider } from './MockProvider'
import { EmailProvider } from './EmailProvider'

export function getEmailProvider(): EmailProvider {
  // Swap MockProvider for a real Gmail provider later
  return new MockProvider()
}