'use client'

import { useState, FormEvent } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('Joining the waitlist...')

    try {
      // You will need to create this API route to handle 
      // the Google Sheets and Email logic
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus("You're on the list! We'll be in touch soon.")
        setEmail('')
      } else {
        setStatus('Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('Error connecting to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ 
      padding: '0.5rem 2rem', 
      maxWidth: '1150px', 
      margin: '0 auto', 
      textAlign: 'center',
      fontFamily: 'sans-serif' 
    }}>
    {/* Logo */}
<img 
  src="/alfrd_logo.png" 
  alt="Alfred Logo" 
  style={{ 
    width: '400px', 
    height: 'auto', 
    marginBottom: '2rem',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto' 
  }}
  onError={(e) => {
    console.error("Image failed to load at /alfrd_logo.png");
    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=Logo+Missing';
  }}
/>
      
      <p style={{ color: '#c7c7c7be', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
        The high-caliber tool you’ve been waiting for is here to match your relentless drive and professional pace. 
        By running lean AI models directly on your phone, ALFRD enables instant, 
        proactive, hands-free email management while you’re behind the wheel. 
        ALFRD is the hero your productivity deserves.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px',       // This stops it from expanding too far
    margin: '0 auto',        // This keeps the form centered
    width: '100%'            // This ensures it stays responsive on mobile
  }}>
        <input
          type="email"
          required
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#000',
            color: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s'
          }}
        >
          {loading ? 'Submitting...' : 'Join Waitlist'}
        </button>
      </form>

      {status && (
        <p style={{ 
          marginTop: '1.5rem', 
          color: status.includes('Error') || status.includes('wrong') ? '#e24a4a' : '#2e7d32',
          fontWeight: '500'
        }}>
          {status}
        </p>
      )}
    </main>
  )
}