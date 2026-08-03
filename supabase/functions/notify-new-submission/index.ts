const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const NOTIFY_TO_EMAIL = Deno.env.get('NOTIFY_TO_EMAIL')
const NOTIFY_FROM_EMAIL = Deno.env.get('NOTIFY_FROM_EMAIL') ?? 'onboarding@resend.dev'

const TABLE_SUBJECTS: Record<string, string> = {
  leads: 'New contact message',
  quotes: 'New quote request',
  bookings: 'New booking request',
}

function renderRows(record: Record<string, unknown>) {
  return Object.entries(record)
    .filter(([key]) => key !== 'id' && key !== 'created_at')
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;font-weight:600;white-space:nowrap;">${key}</td><td style="padding:4px 0;">${value ?? '—'}</td></tr>`
    )
    .join('')
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let payload: { type?: string; table?: string; record?: Record<string, unknown> }
  try {
    payload = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const { type, table, record } = payload
  const subject = table ? TABLE_SUBJECTS[table] : undefined

  if (type !== 'INSERT' || !subject || !record) {
    return new Response('Ignored', { status: 200 })
  }

  if (!RESEND_API_KEY || !NOTIFY_TO_EMAIL) {
    console.error('Missing RESEND_API_KEY or NOTIFY_TO_EMAIL secret')
    return new Response('Server not configured', { status: 500 })
  }

  const html = `
    <h2>${subject}</h2>
    <table>${renderRows(record)}</table>
  `

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: NOTIFY_FROM_EMAIL,
      to: NOTIFY_TO_EMAIL,
      subject,
      html,
    }),
  })

  if (!emailRes.ok) {
    console.error('Resend error:', await emailRes.text())
    return new Response('Email failed', { status: 502 })
  }

  return new Response('OK', { status: 200 })
})
