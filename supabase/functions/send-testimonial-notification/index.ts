import { serve } from 'https://deno.land/std@0.182.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL');
const FROM_EMAIL = Deno.env.get('RESEND_FROM') ?? 'no-reply@sanskarshrestha.com';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (!RESEND_API_KEY || !ADMIN_EMAIL) {
    return new Response('Missing configuration', { status: 500 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { name, email, message, timestamp } = payload as {
    name: string;
    email?: string;
    message: string;
    timestamp: string;
  };

  if (!name || !message || !timestamp) {
    return new Response('Missing required fields', { status: 400 });
  }

  const body = {
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: 'New Testimonial Submitted',
    html: `
      <h1>New Testimonial Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
      <p><strong>Submitted at:</strong> ${timestamp}</p>
    `,
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    return new Response(`Email send failed: ${text}`, { status: 502 });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
