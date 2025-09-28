import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany()
    
    const allTags = new Set<string>()
    
    lessons.forEach(lesson => {
      try {
        const lessonData = JSON.parse(lesson.lessonJson)
        const tags = lessonData.tags || []
        tags.forEach((tag: string) => allTags.add(tag))
      } catch (error) {
        console.error('Error parsing lesson JSON for tags:', error)
      }
    })
    
    return NextResponse.json({
      tags: Array.from(allTags).sort()
    })
  } catch (error) {
    console.error('Tags fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}