import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { createdAt: 'desc' }
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
            bookmarks: Math.floor(Math.random() * 50)
          },
          customAiTool: lessonData.customAiTool,
          promptUsed: lessonData.promptUsed,
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
    
    return NextResponse.json({ lessons: transformedLessons, total: transformedLessons.length })
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return NextResponse.json({ error: 'Failed to fetch lessons', lessons: [], total: 0 }, { status: 500 })
  }
}