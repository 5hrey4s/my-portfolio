'use client'

import React, { useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  role: 'user' | 'bot'
  content: string
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleMessageSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
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
        const botMessage: Message = { role: 'bot', content: data.reply }
        setMessages((prevMessages) => [...prevMessages, botMessage])
      } else {
        const errorMessage: Message = { role: 'bot', content: `Error: ${data.error || 'Something went wrong'}` }
        setMessages((prevMessages) => [...prevMessages, errorMessage])
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { role: 'bot', content: 'Error: Could not connect to the bot. Please try again later.' }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-lg font-semibold">Chat with our AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "mb-4 p-3 rounded-lg max-w-[80%]",
                msg.role === 'user' ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
              )}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted p-3 rounded-lg max-w-[80%] animate-pulse">
              AI is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleMessageSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            aria-label="Chat message input"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const nodeRef = useRef(null)

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" handle=".drag-handle">
      <div ref={nodeRef} className="fixed bottom-4 right-4 z-50">
        <div className={cn(
          "transition-all duration-300 ease-in-out transform",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}>
          <Chatbot />
        </div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg drag-handle cursor-move"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>
    </Draggable>
  )
}

export default FloatingChatbot

