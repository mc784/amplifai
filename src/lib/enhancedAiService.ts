import Anthropic from '@anthropic-ai/sdk'

// Initialize Claude client
const anthropic = process.env.ANTHROPIC_API_KEY && 
                 process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here' &&
                 process.env.ANTHROPIC_API_KEY.startsWith('sk-ant-')
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

export interface LessonData {
  title: string
  quickSummary: string
  problem: string
  solution: string
  impact: string
  tipsWarnings: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  timeToImplement: string
}

const LESSON_PROMPT = `You are an AI assistant that helps Amazon employees create structured lessons learned from their AI implementation experiences.

Analyze the following content and structure it into a lessons learned format. Provide:
1. An 8-10 word title that captures the essence of the scenario
2. A concise summary (50-80 words) encompassing the challenge, solution, and impact
3. A detailed breakdown (100 words each) under these headings:
   - THE CHALLENGE: Identify the key problems, pain points, and root causes
   - OUR SOLUTION: Describe the implemented solution and approach taken
   - IMPACT & RESULTS: Detail the measurable outcomes and benefits realized
   - TIPS & WARNINGS: Highlight the dos and don'ts for lesson users

Structure your response as a JSON object with these exact keys:

{
  "title": "8-10 word title capturing the essence of the scenario",
  "quickSummary": "50-80 word summary encompassing challenge, solution, and impact",
  "problem": "100 words identifying key problems, pain points, and root causes",
  "solution": "100 words describing the implemented solution and approach taken",
  "impact": "100 words detailing measurable outcomes and benefits realized",
  "tipsWarnings": "Highlight dos and don'ts for lesson users",
  "tags": ["3-5 relevant technical tags"],
  "difficulty": "Beginner|Intermediate|Advanced",
  "timeToImplement": "realistic estimate like '2-4 hours' or '1-2 days'"
}

Return ONLY the JSON object, no additional text.`

export async function generateLessonFromContent(content: string): Promise<LessonData> {
  if (!anthropic) {
    throw new Error('Claude API key not configured. Please set ANTHROPIC_API_KEY in your environment.')
  }

  try {
    console.log('Generating lesson with Claude...')
    
    const response = await anthropic.messages.create({
      model: process.env.AI_MODEL || "claude-3-haiku-20240307",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `${LESSON_PROMPT}\n\nContent to analyze:\n\n${content.substring(0, 4000)}`
        }
      ],
    })

    const result = response.content[0]?.type === 'text' ? response.content[0].text : null
    if (!result) {
      throw new Error('No response from Claude')
    }

    console.log('Raw Claude response:', result)

    // Clean up the response to ensure it's valid JSON
    let cleanedResult = result.trim()
    if (cleanedResult.startsWith('```json')) {
      cleanedResult = cleanedResult.replace(/```json\n?/, '').replace(/\n?```$/, '')
    }
    if (cleanedResult.startsWith('```')) {
      cleanedResult = cleanedResult.replace(/```\n?/, '').replace(/\n?```$/, '')
    }

    const lessonData = JSON.parse(cleanedResult) as LessonData
    
    // Validate required fields
    const requiredFields = ['title', 'quickSummary', 'problem', 'solution', 'impact']
    for (const field of requiredFields) {
      if (!lessonData[field as keyof LessonData]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    // Ensure tags is an array
    if (!Array.isArray(lessonData.tags)) {
      lessonData.tags = ['AI Implementation', 'Process Improvement']
    }

    // Ensure difficulty is valid
    if (!['Beginner', 'Intermediate', 'Advanced'].includes(lessonData.difficulty)) {
      lessonData.difficulty = 'Intermediate'
    }

    // Ensure timeToImplement exists
    if (!lessonData.timeToImplement) {
      lessonData.timeToImplement = '2-4 hours'
    }

    console.log('Successfully generated lesson with Claude:', lessonData.title)
    return lessonData

  } catch (error) {
    console.error('Claude lesson generation failed:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('authentication')) {
        throw new Error('Invalid Claude API key. Please check your configuration.')
      }
      if (error.message.includes('rate limit')) {
        throw new Error('Claude rate limit exceeded. Please try again in a moment.')
      }
      if (error.message.includes('JSON')) {
        throw new Error('AI response format error. Please try again.')
      }
    }
    
    throw new Error(`Claude lesson generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function generateTagsFromContent(content: string): Promise<string[]> {
  if (!anthropic) {
    return ['AI Implementation', 'Automation', 'Process Improvement']
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Extract 4-6 relevant technical tags from the content. Focus on AI tools, technologies, business processes, and outcomes. Return only a JSON array of strings.\n\nContent: ${content.substring(0, 2000)}`
        }
      ],
    })

    const result = response.content[0]?.type === 'text' ? response.content[0].text : null
    if (!result) return ['AI Implementation', 'Automation']

    const tags = JSON.parse(result) as string[]
    return Array.isArray(tags) ? tags : ['AI Implementation', 'Automation']
    
  } catch (error) {
    console.error('Tag generation failed:', error)
    return ['AI Implementation', 'Automation', 'Process Improvement']
  }
}