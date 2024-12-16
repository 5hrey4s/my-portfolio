import { NextResponse } from 'next/server';
import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

const sessionId = uuidv4(); // Example: "d9b2d63d-a233-4123-847d-7d2456d54a77"
const credentialsBase64 = process.env.NEXT_PUBLIC_GOOGLE_CREDENTIALS_BASE64;
if (!credentialsBase64) {
    throw new Error('NEXT_PUBLIC_GOOGLE_CREDENTIALS_BASE64 environment variable is not defined');
}
const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'));

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const message = body.message;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const projectId = 'myportfolio-444813'; // Replace with your actual project ID

        // Initialize the Dialogflow client with the credentials from the environment variable
        const client = new SessionsClient({
            credentials: credentials,  // Use the credentials directly from the environment variable
        });

        // Generate the session path manually
        const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;

        // Dialogflow detectIntent request
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en', // Change the language if required
                },
            },
        };

        // Call Dialogflow to detect intent
        const [response] = await client.detectIntent(request);
        const botReply = response.queryResult?.fulfillmentText || 'No response from bot';

        // Return the bot's response
        return NextResponse.json({ reply: botReply });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Dialogflow API Error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error('Unexpected error type:', error);
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
