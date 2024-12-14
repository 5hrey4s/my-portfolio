import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { message } = await request.json(); // Get user message from the request body

    const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
    const API_TOKEN = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY; // Store API token securely

    try {
        // Call Hugging Face Inference API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`, // Pass API token
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: message, // Pass the user's message
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error('Hugging Face API Error:', data.error);
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        // Parse the response and send the chatbot reply

        // const botResponse = data.generated_text || "I couldn't generate a response.";
        const botResponse = Array.isArray(data)
            ? data[0]?.generated_text || "I couldn't generate a response."
            : data.generated_text || "I couldn't generate a response.";
        return NextResponse.json({ reply: botResponse });
    } catch (error: unknown) {
        // Ensure error is of type Error before using its properties
        if (error instanceof Error) {
            console.error('Error with Hugging Face API:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error('Unexpected error type:', error);
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
