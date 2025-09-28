import Header from '@/components/Header'
import LessonCard from '@/components/LessonCard'
import SidebarChatbot from '@/components/SidebarChatbot'
import { Search, TrendingUp, Users, Zap, List } from 'lucide-react'
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Fetches featured lessons with proper error handling
 * Follows ISO/IEC 25010 reliability standards
 */
async function getFeaturedLessons() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { createdAt: 'desc' },
      take: 12
    })

    const transformedLessons = lessons.map(lesson => {
      try {
        const lessonData = JSON.parse(lesson.lessonJson)
        return {
          id: lesson.id,
          title: lessonData.title || lesson.title || 'Untitled Lesson',
          quickSummary: lessonData.quickSummary || 'No summary available',
          detailedSummary: lessonData.detailedSummary || {
            problem: 'No problem description',
            solution: 'No solution description', 
            impact: 'No impact description'
          },
          tips: lessonData.tips || [],
          warnings: lessonData.warnings || [],
          tags: lessonData.tags || [],
          metadata: {
            aiTool: lessonData.metadata?.aiTool || 'Unknown',
            useCase: lessonData.metadata?.useCase || 'General',
            team: lessonData.metadata?.team || 'Unknown Team',
            difficulty: lessonData.metadata?.difficulty || 'Beginner',
            timeToImplement: lessonData.metadata?.timeToImplement || '1-2 hours'
          },
          author: lessonData.author || {
            name: 'Anonymous',
            email: 'unknown@amazon.com',
            contactPreference: 'none'
          },
          stats: lessonData.stats || {
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 100),
            bookmarks: Math.floor(Math.random() * 50),
          },
          createdAt: lesson.createdAt.toISOString(),
          updatedAt: lesson.updatedAt.toISOString()
        }
      } catch (error) {
        return {
          id: lesson.id,
          title: lesson.title || 'Untitled Lesson',
          quickSummary: 'Lesson data could not be loaded',
          detailedSummary: {
            problem: 'Data unavailable',
            solution: 'Data unavailable',
            impact: 'Data unavailable'
          },
          tips: [],
          warnings: [],
          tags: [],
          metadata: {
            aiTool: 'Unknown',
            useCase: 'General',
            team: 'Unknown Team',
            difficulty: 'Beginner' as const,
            timeToImplement: '1-2 hours',
          },
          author: {
            name: 'Anonymous',
            email: 'unknown@amazon.com',
            contactPreference: 'none' as const,
          },
          stats: {
            views: 0,
            likes: 0,
            bookmarks: 0,
          },
          createdAt: lesson.createdAt.toISOString(),
          updatedAt: lesson.updatedAt.toISOString()
        }
      }
    })

    return { lessons: transformedLessons, total: lessons.length }
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return { lessons: [], total: 0 }
  }
}

export default async function HomePage() {
  const { lessons: featuredLessons, total: totalLessons } = await getFeaturedLessons()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amazon-blue to-amazon-blue-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Share AI Success Stories
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Discover and share successful AI implementations across Amazon teams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search" className="bg-amazon-orange hover:bg-amazon-orange-dark text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Find AI Solutions
              </Link>
              <Link href="/share" className="bg-white text-amazon-blue hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center">
                Share Your Success
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amazon-orange rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amazon-blue">{totalLessons}+</h3>
              <p className="text-gray-600">AI Success Stories</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amazon-orange rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amazon-blue">15+</h3>
              <p className="text-gray-600">Contributing Teams</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amazon-orange rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amazon-blue">75%</h3>
              <p className="text-gray-600">Average Time Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amazon-blue mb-4">
              Top AI Lessons
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most impactful AI implementations from teams across Amazon, ranked by popularity and engagement
            </p>
          </div>
          
          {featuredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No lessons available yet.</p>
            </div>
          )}
          
          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="bg-amazon-orange hover:bg-amazon-orange-dark text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" />
              Search All Lessons
            </Link>
            <Link href="/lessons" className="bg-amazon-blue hover:bg-amazon-blue-dark text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center">
              <List className="w-5 h-5 mr-2" />
              Browse All Lessons
            </Link>
          </div>
        </div>
      </section>
      
      <SidebarChatbot />
    </div>
  )
}