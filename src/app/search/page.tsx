'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import LessonCard from '@/components/LessonCard'
import { Send, Bot, User } from 'lucide-react'
import { HelpTooltip } from '@/components/Tooltip'
import { ChatMessage } from '@/types'
import { getRankedLessons, mockLessons } from '@/lib/mockData'

export default function SearchPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you find AI lessons. What kind of AI implementation are you looking for? You can ask about specific tools like Claude, GPT-4, or Bedrock, or describe your use case.",
      timestamp: new Date().toISOString()
    }
  ])
  const [input, setInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState(getRankedLessons(mockLessons, 7))

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    }

    // Simple keyword matching for demo
    const keywords = input.toLowerCase().split(' ')
    const filteredLessons = mockLessons.filter(lesson => 
      keywords.some(keyword => 
        lesson.title.toLowerCase().includes(keyword) ||
        lesson.quickSummary.toLowerCase().includes(keyword) ||
        lesson.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
        lesson.metadata.aiTool.toLowerCase().includes(keyword) ||
        lesson.metadata.useCase.toLowerCase().includes(keyword)
      )
    )

    const results = filteredLessons.length > 0 ? getRankedLessons(filteredLessons, 7) : getRankedLessons(mockLessons, 7)

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Great question! I found ${results.length} relevant lessons for "${input}". Here are the top matches based on your query:`,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage, botResponse])
    setSearchResults(results)
    setInput('')
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chat Interface */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-amazon-blue flex items-center">
                <Bot className="w-5 h-5 mr-2 text-amazon-orange" />
                AI Lesson Assistant
                <HelpTooltip content="I understand natural language! Ask about specific problems, tools, or outcomes you're interested in." position="right" />
              </h2>
              <p className="text-gray-600 text-sm mt-1">Ask me about AI implementations and I'll find relevant lessons</p>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>💡 Example questions:</strong> "How did teams reduce customer support tickets?" • "What AI tools helped with data analysis?" • "Show me Claude implementations"
                </p>
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-xs ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-amazon-blue' : 'bg-amazon-orange'
                    }`}>
                      {message.role === 'user' ? 
                        <User className="w-4 h-4 text-white" /> : 
                        <Bot className="w-4 h-4 text-white" />
                      }
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-amazon-blue text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about AI tools, use cases, or specific challenges..."
                    className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <HelpTooltip content="Ask natural questions like 'How did teams automate customer service?' or 'What AI tools reduced manual work?'" position="top" />
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  className="bg-amazon-orange hover:bg-amazon-orange-dark text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-lg font-semibold text-amazon-blue mb-4">
              {showResults ? `Search Results (${searchResults.length})` : 'Popular Lessons'}
            </h3>
            <div className="space-y-4">
              {searchResults.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
            {searchResults.length === 0 && showResults && (
              <div className="text-center py-8 text-gray-500">
                <p>No lessons found matching your query. Try different keywords!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}