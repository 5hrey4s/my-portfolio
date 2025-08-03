'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Define a clear structure for our chat messages
interface Message {
  id: string;
  sender: 'user' | 'bot' | 'error';
  content: string;
}

// --- MODIFICATION: Added 'setIsOpen' prop to allow closing from within the UI ---
interface ChatbotUIProps {
  setIsOpen: (isOpen: boolean) => void;
}

// This is the Chatbot's internal UI, now with a close button for mobile
const ChatbotUI: React.FC<ChatbotUIProps> = ({ setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Add the initial welcome message from the bot
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-0',
        sender: 'bot',
        content: "Hey! I'm Shreyas's AI assistant. Ask me anything about his skills, projects, or experience.",
      }
    ])
  }, [])

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleMessageSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { id: uuidv4(), sender: 'user', content: input }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_RASA_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: "user", message: input }),
      })

      const rasaResponse = await response.json()

      if (response.ok && rasaResponse && rasaResponse.length > 0) {
        const botMessages: Message[] = rasaResponse.map((msg: { text: string }) => ({
          id: uuidv4(),
          sender: 'bot',
          content: msg.text
        }))
        setMessages(prevMessages => [...prevMessages, ...botMessages])
      } else {
        const errorContent = rasaResponse.error || 'Something went wrong on the server.'
        setMessages(prevMessages => [...prevMessages, { id: uuidv4(), sender: 'error', content: errorContent }])
      }
    } catch (error) {
      console.error('Error connecting to Rasa:', error)
      setMessages(prevMessages => [
        ...prevMessages,
        { id: uuidv4(), sender: 'error', content: 'Could not connect to the bot. Is the Rasa server running?' }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full h-full flex flex-col bg-slate-900/80 from-slate-900 to-slate-800/90 backdrop-blur-lg border border-cyan-500/20 text-white shadow-2xl rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-cyan-500/20">
        <CardTitle className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">AI Assistant</CardTitle>
        {/* --- MODIFICATION: This close button is ONLY visible on mobile screens --- */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden text-slate-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-5 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex items-end gap-2", msg.sender === 'user' ? "justify-end" : "justify-start")}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-400 flex-shrink-0"></div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md transition-all",
                    msg.sender === 'user' ? "bg-cyan-500 text-black rounded-br-none" :
                    msg.sender === 'bot' ? "bg-slate-700/50 text-slate-200 rounded-bl-none" :
                    "bg-red-500/30 text-red-200"
                  )}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-400 flex-shrink-0"></div>
                  <div className="max-w-[80%] rounded-2xl rounded-bl-none px-4 py-3 text-sm bg-slate-700/50 text-slate-200">
                    <p className="flex items-center space-x-1">
                      <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse"></span>
                    </p>
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t border-cyan-500/20">
        <form onSubmit={handleMessageSubmit} className="flex w-full items-center space-x-3">
          <Input
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-full px-5 py-2 transition-all"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-gradient-to-br from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-white rounded-full flex-shrink-0 w-10 h-10 transition-transform duration-200 ease-in-out hover:scale-110">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

// This is the main component that manages the chatbot's state and position
const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen]) // Re-run effect if isOpen changes

  return (
    // --- MODIFICATION: Positioning is now fixed to the bottom-right on all screen sizes ---
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div 
          ref={chatRef} 
          className="w-[calc(100vw-2rem)] h-[85vh] sm:w-[380px] sm:h-[600px] transition-all duration-300 ease-out"
        >
          <ChatbotUI setIsOpen={setIsOpen} />
        </div>
      )}
      
      {!isOpen && (
        <div className="relative">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping"></span>
          <Button
            onClick={() => setIsOpen(true)}
            size="icon"
            className="relative w-16 h-16 rounded-full shadow-2xl bg-gradient-to-br from-cyan-500 to-teal-400 text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-cyan-500/50"
            aria-label="Open chat"
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default FloatingChatbot
