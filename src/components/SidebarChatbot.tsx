'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  lessons?: any[]
}

export default function SidebarChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. Ask me about specific AI challenges, technologies, or use cases to find relevant lessons.",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputText
    setInputText('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      })

      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
        lessons: data.lessons || []
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble processing your request. Please try again.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-[10000]">
        <div className="relative">
          <div className={`absolute inset-0 bg-orange-400 rounded-full animate-ping ${isOpen ? 'opacity-0' : 'opacity-75'}`}></div>
          
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`relative w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border-4 border-white ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
          >
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-1" />
              <MessageCircle className="w-6 h-6" />
            </div>
          </button>
          
          {showTooltip && !isOpen && (
            <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg whitespace-nowrap shadow-xl border border-gray-700">
              <div className="font-semibold">🤖 AI Assistant</div>
              <div className="text-xs text-gray-300">Ask me about AI lessons!</div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-900"></div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 w-96 h-[500px] bg-white rounded-xl shadow-2xl border-2 border-gray-200 z-[10001]">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-sm">AI Assistant</span>
                <div className="text-xs text-blue-100">Powered by AI</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-80">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[85%] p-3 rounded-2xl text-sm ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                    : 'bg-gray-100 text-gray-800 border'
                }`}>
                  <p className="leading-relaxed">{message.text}</p>
                  {message.lessons && message.lessons.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.lessons.map((lesson) => (
                        <div key={lesson.id} className="bg-white p-3 rounded-lg border shadow-sm text-gray-800">
                          <h4 className="font-semibold text-sm mb-2 text-blue-700">{lesson.title}</h4>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{lesson.quickSummary}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {lesson.tags?.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a 
                            href={`/lessons/${lesson.id}`}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                          >
                            View Lesson →
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block bg-gray-100 p-3 rounded-2xl border">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-gray-50 rounded-b-xl">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about AI implementations..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}