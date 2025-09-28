'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import LessonCard from '@/components/LessonCard'
import LessonListView from '@/components/LessonListView'
import SearchFilters from '@/components/SearchFilters'
import { Search, Filter, Bot, Send, Grid3X3, List } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  lessons?: any[]
}

const sampleQuestions = [
  "How can AI help with document processing?",
  "Show me lessons about customer service automation",
  "What are some AI solutions for data analysis?",
  "Find examples of AI in supply chain management",
  "How to implement chatbots for internal support?"
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [lessons, setLessons] = useState<any[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Chat state
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

  // Fetch lessons and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsRes, tagsRes] = await Promise.all([
          fetch('/api/lessons/search'),
          fetch('/api/lessons/tags')
        ])
        
        const lessonsData = await lessonsRes.json()
        const tagsData = await tagsRes.json()
        
        setLessons(lessonsData.lessons || [])
        setAvailableTags(tagsData.tags || [])
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Search lessons when filters change
  useEffect(() => {
    const searchLessons = async () => {
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)
      if (selectedTags.length) params.set('tags', selectedTags.join(','))
      if (selectedDifficulty.length) params.set('difficulty', selectedDifficulty.join(','))
      if (selectedTimeRange.length) params.set('timeRange', selectedTimeRange.join(','))
      if (sortBy) params.set('sortBy', sortBy)

      try {
        const res = await fetch(`/api/lessons/search?${params}`)
        const data = await res.json()
        setLessons(data.lessons || [])
      } catch (error) {
        console.error('Search failed:', error)
      }
    }

    if (!loading) {
      searchLessons()
    }
  }, [searchQuery, selectedTags, selectedDifficulty, selectedTimeRange, sortBy, loading])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    )
  }

  const handleTimeRangeToggle = (timeRange: string) => {
    setSelectedTimeRange(prev => 
      prev.includes(timeRange) 
        ? prev.filter(t => t !== timeRange)
        : [...prev, timeRange]
    )
  }

  const handleClearFilters = () => {
    setSelectedTags([])
    setSelectedDifficulty([])
    setSelectedTimeRange([])
    setSearchQuery('')
  }

  const hasActiveFilters = selectedTags.length > 0 || selectedDifficulty.length > 0 || selectedTimeRange.length > 0

  // Chat functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
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

  const handleSampleQuestionClick = (question: string) => {
    handleSendMessage(question)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amazon-blue mb-4">
            Discover AI Solutions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search through {lessons.length} AI success stories to find solutions that match your needs
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-amazon-orange text-white text-xs px-2 py-1 rounded-full">
                {selectedTags.length + selectedDifficulty.length + selectedTimeRange.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters - Always visible on desktop */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              selectedDifficulty={selectedDifficulty}
              onDifficultyToggle={handleDifficultyToggle}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeToggle={handleTimeRangeToggle}
              sortBy={sortBy}
              onSortChange={setSortBy}
              availableTags={availableTags}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Results */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} found
                      </span>
                    </div>
                    
                    {searchQuery && (
                      <div className="text-sm text-gray-500">
                        Searching for: <span className="font-medium">"{searchQuery}"</span>
                      </div>
                    )}
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-amazon-orange text-white' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title="Grid view"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-amazon-orange text-white' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">Active Filters:</span>
                      <button
                        onClick={handleClearFilters}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-1 bg-amazon-orange text-white text-xs rounded-full">
                          {tag}
                          <button
                            onClick={() => handleTagToggle(tag)}
                            className="ml-1 hover:text-gray-200"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {selectedDifficulty.map(difficulty => (
                        <span key={difficulty} className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          {difficulty}
                          <button
                            onClick={() => handleDifficultyToggle(difficulty)}
                            className="ml-1 hover:text-gray-200"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {selectedTimeRange.map(timeRange => (
                        <span key={timeRange} className="inline-flex items-center px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                          {timeRange}
                          <button
                            onClick={() => handleTimeRangeToggle(timeRange)}
                            className="ml-1 hover:text-gray-200"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lessons Display */}
                {lessons.length > 0 ? (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {lessons.map((lesson) => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                      ))}
                    </div>
                  ) : (
                    <LessonListView lessons={lessons} />
                  )
                ) : (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or filters to find more results.
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={handleClearFilters}
                        className="text-amazon-orange hover:text-amazon-orange-dark font-medium"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Right Sidebar - AI Assistant */}
              <div className="xl:w-80">
                <div className="sticky top-8">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-sm">AI Assistant</span>
                          <div className="text-xs text-blue-100">Ask about AI lessons</div>
                        </div>
                      </div>
                    </div>

                    {/* Sample Questions - Show only when no messages except initial */}
                    {messages.length === 1 && (
                      <div className="p-3 border-b bg-gray-50">
                        <div className="text-xs text-gray-600 mb-2 font-medium">Try asking:</div>
                        <div className="space-y-1">
                          {sampleQuestions.slice(0, 3).map((question, index) => (
                            <button
                              key={index}
                              onClick={() => handleSampleQuestionClick(question)}
                              className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
                            >
                              "{question}"
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chat Messages - Compact height */}
                    <div className="h-48 overflow-y-auto p-3 space-y-3">
                      {messages.map((message) => (
                        <div key={message.id} className={`${message.isUser ? 'text-right' : 'text-left'}`}>
                          <div className={`inline-block max-w-[90%] p-2 rounded-xl text-xs ${
                            message.isUser 
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <p className="leading-relaxed">{message.text}</p>
                            {message.lessons && message.lessons.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.lessons.slice(0, 2).map((lesson) => (
                                  <div key={lesson.id} className="bg-white p-2 rounded-lg border shadow-sm text-gray-800">
                                    <h4 className="font-semibold text-xs mb-1 text-blue-700">{lesson.title}</h4>
                                    <p className="text-xs text-gray-600 mb-1 line-clamp-2">{lesson.quickSummary}</p>
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
                        <div className="text-left">
                          <div className="inline-block bg-gray-100 p-2 rounded-xl">
                            <div className="flex items-center space-x-1">
                              <Bot className="w-3 h-3 text-blue-600" />
                              <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t bg-gray-50">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask about AI implementations..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSendMessage()}
                          disabled={!inputText.trim()}
                          className="px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-full text-xs font-medium transition-all duration-200 flex items-center"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}