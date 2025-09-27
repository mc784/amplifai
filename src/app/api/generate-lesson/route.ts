import { NextRequest, NextResponse } from 'next/server'
import { generateLessonFromContent, generateTagsFromContent } from '@/lib/enhancedAiService'
import { processMultipleFiles, extractTextFromFile } from '@/lib/fileProcessor'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const inputMethod = formData.get('inputMethod') as string
    
    let content = ''

    if (inputMethod === 'text') {
      content = formData.get('textNarrative') as string
      if (!content?.trim()) {
        return NextResponse.json({ error: 'Text narrative is required' }, { status: 400 })
      }
    } else if (inputMethod === 'files') {
      const files = formData.getAll('files') as File[]
      if (!files.length) {
        return NextResponse.json({ error: 'At least one file is required' }, { status: 400 })
      }

      // Validate file sizes
      const totalSize = files.reduce((sum, file) => sum + file.size, 0)
      const maxFileSize = 50 * 1024 * 1024 // 50MB
      const maxTotalSize = 200 * 1024 * 1024 // 200MB

      if (files.some(file => file.size > maxFileSize)) {
        return NextResponse.json({ error: 'Individual file size cannot exceed 50MB' }, { status: 400 })
      }

      if (totalSize > maxTotalSize) {
        return NextResponse.json({ error: 'Total file size cannot exceed 200MB' }, { status: 400 })
      }

      // Process files and extract text
      content = await processMultipleFiles(files)
    } else {
      return NextResponse.json({ error: 'Invalid input method' }, { status: 400 })
    }

    // Limit content length for AI processing
    if (content.length > 50000) {
      content = content.substring(0, 50000) + '...[content truncated]'
    }

    // Generate lesson using enhanced AI prompt
    const lessonData = await generateLessonFromContent(content)
    
    // Generate additional tags
    const suggestedTags = await generateTagsFromContent(content)

    return NextResponse.json({
      success: true,
      lesson: lessonData,
      suggestedTags
    })

  } catch (error) {
    console.error('Lesson generation error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { error: `Failed to generate lesson: ${errorMessage}` },
      { status: 500 }
    )
  }
}