'use client'

import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleMessageSubmit = async (event: React.FormEvent) => {
    console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY)

    event.preventDefault()

    if (!input.trim()) return

    setMessages((prevMessages) => [...prevMessages, `You: ${input}`])
    setIsLoading(true)
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessages((prevMessages) => [...prevMessages, `Bot: ${data.reply}`])
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          `Error: ${data.error || 'Something went wrong'}`,
        ])
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message)
        setMessages((prevMessages) => [
          ...prevMessages,
          `Error: Could not connect to the bot - ${error.message}`,
        ])
      } else {
        console.error('Unknown error:', error)
        setMessages((prevMessages) => [
          ...prevMessages,
          'Error: Could not connect to the bot - Unknown error',
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Chat with our AI</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "mb-4 p-2 rounded-lg",
                msg.startsWith('You:') ? "bg-primary text-primary-foreground ml-auto w-fit" : "bg-muted"
              )}
            >
              {msg}
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted p-2 rounded-lg animate-pulse">
              Bot is typing...
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleMessageSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="mb-4 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
          <Chatbot />
        </div>
      ) : null}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="w-12 h-12 rounded-full shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}

export default FloatingChatbot

