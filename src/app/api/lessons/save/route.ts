import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lessonData, suggestedTags, customTags, customTool, promptUsed } = body

    // Build the complete lesson JSON structure
    const completeLesson = {
      quickSummary: lessonData.quickSummary,
      detailedSummary: {
        problem: lessonData.problem,
        solution: lessonData.solution,
        impact: lessonData.impact
      },
      tips: lessonData.tipsWarnings ? lessonData.tipsWarnings.split('\n').filter(Boolean) : [],
      warnings: [],
      tags: [...(suggestedTags || []), ...(customTags || [])],
      metadata: {
        aiTool: 'User Generated',
        useCase: 'General',
        team: 'Community',
        difficulty: lessonData.difficulty,
        timeToImplement: lessonData.timeToImplement
      },
      author: {
        name: 'Community Member',
        email: 'community@amazon.com',
        contactPreference: 'none'
      },
      stats: {
        views: 0,
        likes: 0,
        bookmarks: 0
      },
      customAiTool: customTool,
      promptUsed: promptUsed
    }

    const contentHash = crypto.createHash('md5').update(JSON.stringify(completeLesson)).digest('hex')
    
    // Check if lesson already exists
    const existing = await prisma.lesson.findUnique({ 
      where: { contentHash } 
    })
    
    if (existing) {
      return NextResponse.json({ 
        success: true, 
        message: 'Lesson already exists',
        lessonId: existing.id 
      })
    }

    // Create new lesson
    const newLesson = await prisma.lesson.create({
      data: {
        title: lessonData.title,
        contentHash,
        originalFilename: 'user-generated-lesson',
        fileType: 'user-input',
        lessonJson: JSON.stringify(completeLesson),
        subject: 'AI Implementation',
        gradeLevel: lessonData.difficulty,
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Lesson saved successfully',
      lessonId: newLesson.id 
    })

  } catch (error) {
    console.error('Error saving lesson:', error)
    return NextResponse.json(
      { error: 'Failed to save lesson' },
      { status: 500 }
    )
  }
}