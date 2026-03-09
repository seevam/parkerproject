import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a helpful customer support agent for Levelling Labs, an e-commerce website that sells gadgets with custom 3D printed accessories.

Key information about Levelling Labs:
- We sell gadgets and 3D printed accessories (both premade and customized)
- Customized accessories are more expensive than premade ones
- We have an XP/leveling system where customers earn XP with every purchase
- There are 10 levels with benefits like faster shipping, coupons (5%, 10%, 15%), and subscription trials
- We offer three subscription tiers: Pass ($49/month), Plus ($79/month), and Premium ($99/month)
- Payment methods: WeChat Pay, Alipay, PayPal, Credit/Debit cards
- Contact email: levellinglabs@gmail.com
- Level benefits:
  * Level 3+: 3-5 day shipping, 5% coupon
  * Level 5+: 7-day pass trial
  * Level 7+: 2-3 day shipping, 10% coupon
  * Level 10: 1-2 day shipping, 15% coupon, 14-day premium trial

Be friendly, helpful, and knowledgeable. Help customers with questions about products, shipping, returns, subscriptions, and the leveling system.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const responseText = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Sorry, I could not process that request.';

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
