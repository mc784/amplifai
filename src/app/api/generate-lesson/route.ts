import { NextRequest, NextResponse } from 'next/server'
import { generateLessonFromContent as generateBedrockLesson, generateTagsFromContent as generateBedrockTags } from '@/lib/bedrockService'
import { generateLessonFromContent as generateEnhancedLesson, generateTagsFromContent as generateEnhancedTags } from '@/lib/enhancedAiService'
import { generateLessonFromContent as generateDemoLesson, generateTagsFromContent as generateDemoTags } from '@/lib/demoAiService'
import { processMultipleFiles } from '@/lib/fileProcessor'
import { validateFiles, SUPPORTED_FILE_TYPES } from '@/lib/fileValidation'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

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

      const validation = validateFiles(files)
      if (!validation.isValid) {
        return NextResponse.json({ error: validation.error }, { status: 400 })
      }

      for (const file of files) {
        if (!SUPPORTED_FILE_TYPES[file.type as keyof typeof SUPPORTED_FILE_TYPES]) {
          return NextResponse.json({ 
            error: `Unsupported file type: ${file.type}. Supported: PDF, Word, Excel, PowerPoint, Text, Markdown` 
          }, { status: 400 })
        }
      }

      content = await processMultipleFiles(files)
    } else {
      return NextResponse.json({ error: 'Invalid input method' }, { status: 400 })
    }

    if (content.length > 50000) {
      content = content.substring(0, 50000) + '...[content truncated]'
    }

    let lessonData
    let suggestedTags
    
    // Try services in priority order: Bedrock > Claude > Demo
    const servicePriority = process.env.AI_SERVICE_PRIORITY || 'bedrock'
    
    try {
      if (servicePriority === 'bedrock') {
        console.log('🔑 Bedrock Config Debug:')
        console.log('- AWS Region:', process.env.AWS_REGION)
        console.log('- Using default AWS credential chain (corporate credentials)')
        console.log('- Attempting Bedrock connection...')
        
        console.log('✅ Trying Amazon Bedrock')
        lessonData = await generateBedrockLesson(content)
        suggestedTags = await generateBedrockTags(content)
        console.log('✅ Bedrock successful!')
      } else {
        throw new Error('Bedrock not prioritized, trying Claude')
      }
    } catch (bedrockError) {
      console.log('🔄 Bedrock failed, trying Claude:', bedrockError instanceof Error ? bedrockError.message : 'Unknown error')
      
      try {
        const hasValidApiKey = process.env.ANTHROPIC_API_KEY && 
                              process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here' &&
                              process.env.ANTHROPIC_API_KEY.startsWith('sk-ant-')
        
        if (hasValidApiKey) {
          console.log('✅ Using Claude API')
          lessonData = await generateEnhancedLesson(content)
          suggestedTags = await generateEnhancedTags(content)
        } else {
          throw new Error('No valid Claude API key, using demo service')
        }
      } catch (claudeError) {
        console.log('🔄 Claude failed, using demo service:', claudeError instanceof Error ? claudeError.message : 'Unknown error')
        lessonData = await generateDemoLesson(content)
        suggestedTags = await generateDemoTags(content)
      }
    }

    // Auto-save lesson to database
    try {
      const contentHash = crypto.createHash('md5').update(content).digest('hex')
      const existing = await prisma.lesson.findUnique({ where: { contentHash } })
      
      if (!existing) {
        await prisma.lesson.create({
          data: {
            title: lessonData.title || 'Generated Lesson',
            contentHash,
            originalFilename: inputMethod === 'files' ? 'uploaded-files' : 'text-input',
            fileType: inputMethod,
            lessonJson: JSON.stringify(lessonData),
            subject: lessonData.subject,
            gradeLevel: lessonData.gradeLevel,
          }
        })
      }
    } catch (saveError) {
      console.log('Failed to auto-save lesson:', saveError)
      // Don't fail the request if save fails
    }

    return NextResponse.json({
      success: true,
      lesson: lessonData,
      suggestedTags
    })

  } catch (error) {
    console.error('Lesson generation error:', error)
    
    let errorMessage = 'Unknown error occurred'
    let statusCode = 500
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      if (errorMessage.includes('API key') || errorMessage.includes('authentication') || errorMessage.includes('credentials')) {
        statusCode = 401
        errorMessage = 'Authentication error: Please check your AI service configuration'
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
        statusCode = 429
        errorMessage = 'Rate limit exceeded: Please try again in a moment'
      } else if (errorMessage.includes('timeout') || errorMessage.includes('network')) {
        statusCode = 503
        errorMessage = 'Network error: Please check your connection and try again'
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        timestamp: new Date().toISOString(),
        retryable: statusCode >= 500 || statusCode === 429
      },
      { status: statusCode }
    )
  }
}