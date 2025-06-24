import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using the more cost-effective model
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json({
      message: assistantMessage,
      usage: completion.usage,
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Return a fallback response
    return NextResponse.json({
      message: "I'm Abdul Wahab's AI Assistant! I'd love to help you learn about AI agent development and IoT solutions. While I'm having technical difficulties right now, feel free to contact Abdul directly at abdulwahabawan82@gmail.com or WhatsApp +92 321 942 4726 for immediate assistance with your projects! 🚀",
    });
  }
} 