import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {

  console.log('API route hit');
  let email = null;
  try {
    const body = await request.json();
    email = body.email;
    console.log('Email:', email);
  } catch (err) {
    console.error('Error parsing request body:', err);
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  try {
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in waitlist API:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to send email.' }, { status: 500 });
  }
}
