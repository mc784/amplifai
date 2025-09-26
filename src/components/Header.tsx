'use client'

import Link from 'next/link'
import { Search, Plus, User } from 'lucide-react'
import Tooltip from './Tooltip'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amazon-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-amazon-blue">AmplifAI</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Tooltip content="Search for AI lessons using natural language. Try asking 'How did teams reduce costs with AI?'">
              <Link href="/search" className="flex items-center space-x-1 text-gray-700 hover:text-amazon-orange" data-tour="search">
                <Search className="w-4 h-4" />
                <span>Search Lessons</span>
              </Link>
            </Tooltip>
            <Tooltip content="Share your AI implementation story. Upload documents or type directly - our AI will create a structured lesson.">
              <Link href="/share" className="flex items-center space-x-1 text-gray-700 hover:text-amazon-orange" data-tour="share">
                <Plus className="w-4 h-4" />
                <span>Share Lesson</span>
              </Link>
            </Tooltip>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="bg-white hover:bg-gray-50 text-amazon-blue border border-gray-300 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
              Login with Phonetool SSO
            </button>
            <User className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}