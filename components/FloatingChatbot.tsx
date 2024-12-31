'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string;
  sender: 'You' | 'Bot' | 'Error';
  content: string;
  isComplete: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add welcome message when the component mounts
    setMessages([
      {
        id: '0',
        sender: 'Bot',
        content: "Hello! I'm your AI assistant. How can I help you today?",
        isComplete: false
      }
    ])
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const incompleteMessage = messages.find(msg => !msg.isComplete)
    if (incompleteMessage) {
      const timer = setTimeout(() => {
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === incompleteMessage.id
              ? { ...msg, isComplete: true }
              : msg
          )
        )
      }, 500 + incompleteMessage.content.length * 20) // Adjust timing based on message length

      return () => clearTimeout(timer)
    }
  }, [messages])

  const handleMessageSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!input.trim()) return

    const userMessageId = Date.now().toString()
    setMessages(prevMessages => [
      ...prevMessages,
      { id: userMessageId, sender: 'You', content: input, isComplete: true }
    ])
    setIsLoading(true)
    setInput('')

    const botMessageId = (Date.now() + 1).toString()
    setMessages(prevMessages => [
      ...prevMessages,
      { id: botMessageId, sender: 'Bot', content: '', isComplete: false }
    ])

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
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === botMessageId
              ? { ...msg, content: data.reply }
              : msg
          )
        )
      } else {
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === botMessageId
              ? { ...msg, sender: 'Error', content: data.error || 'Something went wrong' }
              : msg
          )
        )
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === botMessageId
            ? { ...msg, sender: 'Error', content: 'Could not connect to the bot' }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px] h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pt-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
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
                  <p>
                    {msg.isComplete ? msg.content : msg.content + '▋'}
                    {!msg.isComplete && (
                      <span className="animate-pulse">...</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-2">
        <form onSubmit={handleMessageSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(true)

  useEffect(() => {
    if (!isOpen && hasNewMessage) {
      const interval = setInterval(() => {
        setHasNewMessage(prev => !prev)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isOpen, hasNewMessage])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-4 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
          <Chatbot />
        </div>
      )}
      <Button
        onClick={() => {
          setIsOpen(!isOpen)
          setHasNewMessage(false)
        }}
        size="icon"
        className={cn(
          "w-12 h-12 rounded-full shadow-lg transition-all duration-300",
          hasNewMessage && !isOpen && "animate-bounce"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </div>
        )}
      </Button>
    </div>
  )
}

export default FloatingChatbot

