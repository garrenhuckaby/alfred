// Client-side text-to-speech using the Web Speech API
export function speak(text: string): void {
  if (typeof window === 'undefined') return

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1
  utterance.pitch = 1
  utterance.volume = 1
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined') return
  window.speechSynthesis.cancel()
}