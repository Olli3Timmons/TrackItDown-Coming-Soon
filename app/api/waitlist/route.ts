import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple email format validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  // 1. Parse and validate the request body
  let email: string;
  try {
    const body = await request.json();
    email = body.email?.trim()?.toLowerCase();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // 2. Validate email
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: 'Please provide a valid email address.' },
      { status: 400 }
    );
  }

  // 3. Rate limiting — basic per-month counter using a JSON file
  //    (replace with a proper DB or Redis in production)
  const counterPath = path.join(process.cwd(), 'app', 'api', 'waitlist', 'email-count.json');
  try {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    let counter = { month: currentMonth, count: 0 };
    try {
      const raw = await fs.readFile(counterPath, 'utf8');
      counter = JSON.parse(raw);
      // Reset counter if it's a new month
      if (counter.month !== currentMonth) {
        counter = { month: currentMonth, count: 0 };
      }
    } catch {
      // File doesn't exist or is corrupt — start fresh
    }

    // Resend free tier: 100 emails/day, 3,000/month
    if (counter.count >= 2500) {
      console.warn(`Monthly email limit reached: ${counter.count}`);
      return NextResponse.json(
        { success: false, error: 'We are experiencing high demand. Please try again later.' },
        { status: 429 }
      );
    }

    // 4. Read the HTML email template
    const templatePath = path.join(process.cwd(), 'lib', 'waitlist-email-template.html');
    let html: string;
    try {
      html = await fs.readFile(templatePath, 'utf8');
    } catch {
      console.error('Email template not found at:', templatePath);
      return NextResponse.json(
        { success: false, error: 'Internal server error.' },
        { status: 500 }
      );
    }

    // 5. Send the confirmation email
    const { error: sendError } = await resend.emails.send({
      from: 'TrackItDown Waitlist <waitlist@trackitdown.co.uk>',
      to: email,
      subject: 'You\'re on the TrackItDown Waitlist! 🎉',
      html,
    });

    if (sendError) {
      console.error('Resend API error:', sendError);
      return NextResponse.json(
        { success: false, error: 'Failed to send confirmation email. Please try again.' },
        { status: 500 }
      );
    }

    // 6. Increment the counter
    counter.count += 1;
    try {
      await fs.writeFile(counterPath, JSON.stringify(counter, null, 2));
    } catch (writeErr) {
      // Non-critical — log but don't fail the request
      console.warn('Could not update email counter:', writeErr);
    }

    console.log(`Waitlist signup: ${email} (total this month: ${counter.count})`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in waitlist API:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
