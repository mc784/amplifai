'use client'

import Link from 'next/link'
import { Search, Plus, User } from 'lucide-react'

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
            <Link href="/search" className="flex items-center space-x-1 text-gray-700 hover:text-amazon-orange">
              <Search className="w-4 h-4" />
              <span>Search Lessons</span>
            </Link>
            <Link href="/share" className="flex items-center space-x-1 text-gray-700 hover:text-amazon-orange">
              <Plus className="w-4 h-4" />
              <span>Share Lesson</span>
            </Link>
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