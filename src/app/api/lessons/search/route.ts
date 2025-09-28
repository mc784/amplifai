import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const difficulty = searchParams.get('difficulty')?.split(',').filter(Boolean) || []
    const sortBy = searchParams.get('sortBy') || 'relevance'

    let lessons = await prisma.lesson.findMany({
      orderBy: sortBy === 'newest' ? { createdAt: 'desc' } : 
               sortBy === 'oldest' ? { createdAt: 'asc' } : 
               { createdAt: 'desc' }
    })

    // Transform database lessons to match Lesson interface
    const transformedLessons = lessons.map(lesson => {
      try {
        const lessonData = JSON.parse(lesson.lessonJson)
        
        // Ensure the lesson has all required properties with defaults
        return {
          id: lesson.id,
          title: lessonData.title || lesson.title || 'Untitled Lesson',
          quickSummary: lessonData.quickSummary || lessonData.summary || 'No summary available',
          detailedSummary: lessonData.detailedSummary || {
            problem: lessonData.problem || 'No problem description',
            solution: lessonData.solution || 'No solution description', 
            impact: lessonData.impact || 'No impact description'
          },
          tips: lessonData.tips || [],
          warnings: lessonData.warnings || [],
          tags: lessonData.tags || [],
          metadata: {
            aiTool: lessonData.metadata?.aiTool || lessonData.aiTool || 'Unknown',
            useCase: lessonData.metadata?.useCase || lessonData.useCase || 'General',
            team: lessonData.metadata?.team || lessonData.team || 'Unknown Team',
            difficulty: lessonData.metadata?.difficulty || lessonData.difficulty || 'Beginner',
            timeToImplement: lessonData.metadata?.timeToImplement || lessonData.timeToImplement || '1-2 hours'
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
          customAiTool: lessonData.customAiTool,
          promptUsed: lessonData.promptUsed,
          createdAt: lesson.createdAt.toISOString(),
          updatedAt: lesson.updatedAt.toISOString()
        }
      } catch (error) {
        console.error('Error parsing lesson JSON for lesson', lesson.id, ':', error)
        // Return a basic lesson structure if JSON parsing fails
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

    // Apply filters
    let filteredLessons = transformedLessons

    if (q) {
      const query = q.toLowerCase()
      filteredLessons = filteredLessons.filter(lesson =>
        lesson.title.toLowerCase().includes(query) ||
        lesson.quickSummary.toLowerCase().includes(query) ||
        lesson.tags.some((tag: string) => tag.toLowerCase().includes(query))
      )
    }

    if (tags.length > 0) {
      filteredLessons = filteredLessons.filter(lesson =>
        tags.some(tag => lesson.tags.includes(tag))
      )
    }

    if (difficulty.length > 0) {
      filteredLessons = filteredLessons.filter(lesson =>
        difficulty.includes(lesson.metadata.difficulty)
      )
    }

    return NextResponse.json({
      lessons: filteredLessons,
      total: filteredLessons.length
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to search lessons',
        lessons: [],
        total: 0
      },
      { status: 500 }
    )
  }
}