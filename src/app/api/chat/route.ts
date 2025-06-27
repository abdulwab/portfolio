import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Abdul Wahab Portfolio AI Assistant',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini', // Using GPT-4o mini via OpenRouter - 60% cheaper and more capable than GPT-3.5-turbo
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from OpenRouter');
    }

    return NextResponse.json({
      message: assistantMessage,
      usage: data.usage,
    });

  } catch (error) {
    console.error('OpenRouter API Error:', error);
    
    // Return a fallback response with Abdul's context
    return NextResponse.json({
      message: "Hi! I'm Abdul Wahab's AI Assistant! 🤖 While I'm having technical difficulties, I'd love to help you learn about Abdul's expertise in AI agent development and IoT solutions. Abdul specializes in:\n\n🔹 AI Agents with LangChain, LangGraph, CrewAI\n🔹 IoT Solutions with ESP32, MQTT, LoRaWAN\n🔹 Automation with N8N, Make.com, Zapier\n🔹 Full-stack development with Next.js, React\n\nFeel free to contact Abdul directly:\n📧 abdulwahabawan82@gmail.com\n📱 WhatsApp: +92 321 942 4726\n\nWhat specific project can Abdul help you with? 🚀",
    });
  }
} 