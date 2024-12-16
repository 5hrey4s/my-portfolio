'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  sender: 'You' | 'Bot' | 'Error';
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleMessageSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!input.trim()) return

    setMessages((prevMessages) => [...prevMessages, { sender: 'You', content: input }])
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
        setMessages((prevMessages) => [...prevMessages, { sender: 'Bot', content: data.reply }])
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Error', content: data.error || 'Something went wrong' },
        ])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Error', content: 'Could not connect to the bot' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px] h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Chat with our AI</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pt-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  msg.sender === 'You' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    msg.sender === 'You' ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}
                >
                  <p className="font-semibold">{msg.sender}</p>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted max-w-[80%] rounded-lg px-3 py-2 text-sm">
                  <p className="font-semibold">Bot</p>
                  <p className="animate-pulse">Typing...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-2">
        <form onSubmit={handleMessageSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-4 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
          <Chatbot />
        </div>
      )}
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

