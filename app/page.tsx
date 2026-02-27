'use client'

import { useEffect, useState } from 'react'
import { Email } from '@/types/email'
import { speak } from '@/lib/speak'

export default function Home() {
  const [emails, setEmails] = useState<Email[]>([])
  const [status, setStatus] = useState('Press "Check Emails" to begin.')

  async function checkEmails() {
    setStatus('Fetching unread emails...')
    const res = await fetch('/api/unread')
    const data = await res.json()
    setEmails(data.emails)
    speak(`You have ${data.emails.length} unread emails.`)
    setStatus(`You have ${data.emails.length} unread emails.`)
  }

  async function handleSummarize(email: Email) {
    setStatus(`Summarizing email from ${email.from}...`)
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: email.body }),
    })
    const data = await res.json()
    speak(data.summary)
    setStatus(data.summary)
  }

  async function handleDelete(email: Email) {
    await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: email.id }),
    })
    setEmails((prev) => prev.filter((e) => e.id !== email.id))
    speak(`Deleted email from ${email.from}.`)
    setStatus(`Deleted email from ${email.from}.`)
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Alfred</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Your voice email assistant</p>

      <button
        onClick={checkEmails}
        style={{
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #333',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '1.5rem',
        }}
      >
        Check Emails
      </button>

      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>{status}</p>

      {emails.map((email) => (
        <div
          key={email.id}
          style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>{email.subject}</p>
          <p style={{ color: '#888', fontSize: '0.875rem', margin: '0.25rem 0' }}>From: {email.from}</p>
          <p style={{ color: '#ccc', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{email.body}</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleSummarize(email)} style={btnStyle('#1a1a2e', '#4a90e2')}>Summarize</button>
            <button onClick={() => handleDelete(email)} style={btnStyle('#2e1a1a', '#e24a4a')}>Delete</button>
          </div>
        </div>
      ))}
    </main>
  )
}

function btnStyle(bg: string, color: string) {
  return {
    background: bg,
    color,
    border: `1px solid ${color}`,
    padding: '0.4rem 0.9rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  }
}