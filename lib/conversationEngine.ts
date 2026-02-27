import { Email } from '@/types/email'
import { speak } from './speak'

type ConversationState = 'idle' | 'reading' | 'awaiting_action'

let state: ConversationState = 'idle'
let currentEmail: Email | null = null

export function getState() {
  return state
}

export function startReading(email: Email) {
  currentEmail = email
  state = 'awaiting_action'
  speak(`Email from ${email.from}. Subject: ${email.subject}. ${email.body}`)
}

export function handleAction(action: 'reply' | 'delete' | 'skip') {
  if (!currentEmail) return

  if (action === 'reply') {
    speak('What would you like to say in your reply?')
  } else if (action === 'delete') {
    speak(`Deleting email from ${currentEmail.from}.`)
  } else {
    speak('Skipping to the next email.')
  }

  state = 'idle'
  currentEmail = null
}

export function reset() {
  state = 'idle'
  currentEmail = null
}