import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Use the exact names from your .env.local file
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const { error } = await supabase
      .from('waitlist') // Make sure your table is named 'waitlist' in Supabase
      .insert([{ email }])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}