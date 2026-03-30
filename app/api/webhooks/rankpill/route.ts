import { NextResponse } from 'next/server';

/**
 * RankPill Webhook Handler
 * 
 * This route is used to receive data from RankPill (rankpill.com)
 * when post events (created, updated, deleted) occur.
 * 
 * Webhook URL: /api/webhooks/rankpill
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Log the incoming webhook for debugging
    console.log('--- RankPill Webhook Received ---');
    console.log('Payload:', JSON.stringify(payload, null, 2));

    // Handle verification/test request from RankPill
    if (payload.test === true) {
      console.log('Verified: Test webhook received from RankPill');
      return NextResponse.json(
        { 
          success: true, 
          message: 'Webhook configuration verified successfully' 
        }, 
        { status: 200 }
      );
    }

    // Process other events (post.created, etc.)
    const { event, data } = payload;
    
    switch (event) {
      case 'post.created':
        console.log(`New post created: ${data.title} (${data.slug})`);
        // TODO: Add custom logic here (e.g., notify team, update cache)
        break;
      case 'post.updated':
        console.log(`Post updated: ${data.title} (${data.slug})`);
        break;
      case 'post.deleted':
        console.log(`Post deleted: ID ${data.id}`);
        break;
      default:
        console.log(`Received unknown event type: ${event}`);
    }

    // Always return a 200 OK for RankPill to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Error handling RankPill webhook:', error);
    
    // Even if there's an error parsing, we should generally return a 
    // response to RankPill, though 400 or 500 is appropriate if we can't process it.
    return NextResponse.json(
      { success: false, error: 'Malformed payload or internal error' },
      { status: 400 }
    );
  }
}

// Optional: Handle GET requests if RankPill performs a GET probe
export async function GET() {
  return NextResponse.json(
    { message: 'RankPill webhook endpoint is active. Use POST for incoming events.' },
    { status: 200 }
  );
}
