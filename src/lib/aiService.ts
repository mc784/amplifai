import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface LessonData {
  title: string
  quickSummary: string
  problem: string
  solution: string
  impact: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  timeToImplement: string
}

const LESSON_GENERATION_PROMPT = `You are an AI assistant that helps Amazon employees create structured lessons from their AI implementation experiences.

Analyze the provided content and extract a structured lesson following this format:

1. **Title**: Create a problem-solution focused title (max 8 words) in format "Fixed/Solved/Eliminated [Problem] Using [Tool]"
2. **Quick Summary**: One sentence impact statement (max 50 words)
3. **Problem**: What specific challenge was faced (max 100 words)
4. **Solution**: How it was solved with AI (max 100 words)  
5. **Impact**: Quantified results and benefits (max 100 words)
6. **Tags**: 3-5 relevant technical tags
7. **Difficulty**: Beginner/Intermediate/Advanced based on technical complexity
8. **Time to Implement**: Realistic estimate (e.g., "2-4 hours", "1-2 days")

Focus on:
- Specific, actionable information
- Quantified results where possible
- Technical details that others can replicate
- Clear problem-solution-impact narrative

Return ONLY a valid JSON object with these exact keys: title, quickSummary, problem, solution, impact, tags, difficulty, timeToImplement`

export async function generateLessonFromContent(content: string): Promise<LessonData> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: LESSON_GENERATION_PROMPT },
        { role: "user", content: `Please analyze this content and create a structured lesson:\n\n${content}` }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const result = response.choices[0]?.message?.content
    if (!result) throw new Error('No response from AI')

    const lessonData = JSON.parse(result) as LessonData
    
    // Validate required fields
    if (!lessonData.title || !lessonData.quickSummary || !lessonData.problem || 
        !lessonData.solution || !lessonData.impact) {
      throw new Error('Invalid lesson structure returned')
    }

    return lessonData
  } catch (error) {
    console.error('AI lesson generation failed:', error)
    throw new Error('Failed to generate lesson. Please try again.')
  }
}

export async function generateTagsFromContent(content: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "Extract 4-6 relevant technical tags from the content. Return only a JSON array of strings. Focus on: AI tools, technologies, business processes, outcomes." 
        },
        { role: "user", content: content }
      ],
      temperature: 0.3,
      max_tokens: 100,
    })

    const result = response.choices[0]?.message?.content
    if (!result) return []

    return JSON.parse(result) as string[]
  } catch (error) {
    console.error('Tag generation failed:', error)
    return ['AI Implementation', 'Automation', 'Process Improvement']
  }
}