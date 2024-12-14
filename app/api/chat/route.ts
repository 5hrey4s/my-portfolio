// app/api/chat/route.ts

import { OpenAI } from 'openai'; // Import OpenAI package
import { NextResponse } from 'next/server'; // Use NextResponse for Next.js API routes

// Create OpenAI instance with API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // API Key from environment variable
});

export async function POST(request: Request) {
  const { message } = await request.json(); // Get message from request body
  try {
    // Send message to OpenAI's GP  T model
    const response = await openai.chat.completions.create({
      model: 'GPT-4o', // or 'gpt-3.5-turbo'
      messages: [{ role: 'user', content: message }],
    });
    // Extract response from OpenAI
    const botResponse = response.choices[0].message.content;
    // Send back the response
    return NextResponse.json({ reply: botResponse });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
