import Header from '@/components/Header'
import LessonCard from '@/components/LessonCard'
import { PrismaClient } from '@prisma/client'
import { Search } from 'lucide-react'

const prisma = new PrismaClient()

async function getAllLessons() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return lessons.map(lesson => {
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
            bookmarks: Math.floor(Math.random() * 50)
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
            timeToImplement: '1-2 hours'
          },
          author: {
            name: 'Anonymous',
            email: 'unknown@amazon.com',
            contactPreference: 'none' as const
          },
          stats: {
            views: 0,
            likes: 0,
            bookmarks: 0
          },
          createdAt: lesson.createdAt.toISOString(),
          updatedAt: lesson.updatedAt.toISOString()
        }
      }
    })
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return []
  }
}

export default async function LessonsPage() {
  const lessons = await getAllLessons()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amazon-blue mb-4">
            All AI Lessons
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse all {lessons.length} AI implementation lessons from teams across Amazon
          </p>
        </div>
        
        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No lessons available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}