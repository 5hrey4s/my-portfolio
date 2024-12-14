// components/Chatbot.tsx

import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMessageSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!input.trim()) return;

    // Add the user's message to the chat
    setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);
    setIsLoading(true);
    setInput(''); // Clear the input field

    try {
      // Send the message to the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the bot's response to the chat
        setMessages((prevMessages) => [...prevMessages, `Bot: ${data.reply}`]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          `Error: ${data.error || 'Something went wrong'}`,
        ]);
      }
    } catch (error) {
        if (error instanceof Error) {
          console.error('Error:', error.message); // Log the error message
          setMessages((prevMessages) => [
            ...prevMessages,
            `Error: Could not connect to the bot - ${error.message}`,
          ]);
        } else {
          console.error('Unknown error:', error);
          setMessages((prevMessages) => [
            ...prevMessages,
            'Error: Could not connect to the bot - Unknown error',
          ]);
        }
      }
       finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          height: '300px',
          overflowY: 'scroll',
          marginBottom: '20px',
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
        {isLoading && <p>Bot is typing...</p>}
      </div>

      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
