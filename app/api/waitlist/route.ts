import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_LIMIT = 100;
const COUNT_FILE = path.join(process.cwd(), 'app', 'api', 'waitlist', 'email-count.json');

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    // Read and update email count
    let countData = { month: '', count: 0 };
    try {
      const raw = await fs.readFile(COUNT_FILE, 'utf8');
      countData = JSON.parse(raw);
    } catch (err) {
      console.error('Error reading count file:', err);
    }
    const currentMonth = getCurrentMonth();
    if (countData.month !== currentMonth) {
      countData = { month: currentMonth, count: 0 };
    }
    if (countData.count >= EMAIL_LIMIT) {
      return NextResponse.json({ success: false, error: 'Monthly email limit reached.' }, { status: 429 });
    }

    // Read the HTML template from the file system
    const templatePath = path.join(process.cwd(), 'lib', 'waitlist-email-template.html');
    let html = '';
    try {
      html = await fs.readFile(templatePath, 'utf8');
    } catch (err) {
      console.error('Error reading email template:', err);
      return NextResponse.json({ success: false, error: 'Email template not found.' }, { status: 500 });
    }

    try {
      await resend.emails.send({
        from: 'waitlist@trackitdown.com',
        to: email,
        subject: 'Welcome to the TrackItDown Waitlist!',
        html
      });
    } catch (err) {
      console.error('Error sending email:', err);
      return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
    }

    // Increment and save count
    try {
      countData.count += 1;
      await fs.writeFile(COUNT_FILE, JSON.stringify(countData, null, 2));
    } catch (err) {
      console.error('Error writing count file:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in waitlist API:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to send email.' }, { status: 500 });
  }
}
