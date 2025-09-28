import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const relevantLessons = await findRelevantLessons(message)
    const response = await generateAIResponse(message, relevantLessons)

    return NextResponse.json({
      response,
      lessons: relevantLessons.slice(0, 3)
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}

async function findRelevantLessons(userMessage: string) {
  try {
    const lessons = await prisma.lesson.findMany()
    const query = userMessage.toLowerCase()
    
    const scoredLessons = lessons.map(lesson => {
      let score = 0
      let lessonData
      
      try {
        lessonData = JSON.parse(lesson.lessonJson)
      } catch {
        return { lesson: null, score: 0 }
      }
      
      // Title matches
      if (lessonData.title?.toLowerCase().includes(query)) {
        score += 20
      }
      
      // Tag matches
      if (lessonData.tags) {
        lessonData.tags.forEach((tag: string) => {
          if (tag.toLowerCase().includes(query) || query.includes(tag.toLowerCase())) {
            score += 15
          }
        })
      }
      
      // Content matches
      if (lessonData.quickSummary?.toLowerCase().includes(query)) score += 10
      if (lessonData.detailedSummary?.problem?.toLowerCase().includes(query)) score += 12
      if (lessonData.detailedSummary?.solution?.toLowerCase().includes(query)) score += 12
      
      return { 
        lesson: {
          id: lesson.id,
          title: lessonData.title || lesson.title,
          quickSummary: lessonData.quickSummary || 'No summary',
          tags: lessonData.tags || []
        }, 
        score 
      }
    })
    
    return scoredLessons
      .filter(item => item.score > 0 && item.lesson)
      .sort((a, b) => b.score - a.score)
      .map(item => item.lesson)
  } catch (error) {
    console.error('Error finding lessons:', error)
    return []
  }
}

async function generateAIResponse(userMessage: string, relevantLessons: any[]): Promise<string> {
  if (relevantLessons.length === 0) {
    return `I couldn't find specific lessons matching your query. Try asking about specific technologies (like "AI", "machine learning", "automation") or use cases (like "customer service", "data analysis", "process improvement").`
  }
  
  const lessonCount = relevantLessons.length
  const topLesson = relevantLessons[0]
  
  return `I found ${lessonCount} relevant lesson${lessonCount > 1 ? 's' : ''} for you! "${topLesson.title}" seems most relevant - ${topLesson.quickSummary.toLowerCase()}`
}