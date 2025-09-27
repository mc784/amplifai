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
  tipsWarnings: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  timeToImplement: string
}

const ENHANCED_LESSON_PROMPT = `You are an AI assistant that helps Amazon employees create structured lessons learned from their AI implementation experiences.

Please analyze the following content and structure it into a lessons learned format. Provide:

1. **Title**: An 8-10 word title that captures the essence of the scenario in format "Fixed/Solved/Eliminated [Problem] Using [Tool]"
2. **Quick Summary**: A concise summary (50-80 words) encompassing the challenge, solution, and impact
3. **Detailed breakdown** (100 words each) under these headings:
   - **THE CHALLENGE**: Identify the key problems, pain points, and root causes
   - **OUR SOLUTION**: Describe the implemented solution and approach taken  
   - **IMPACT & RESULTS**: Detail the measurable outcomes and benefits realized
4. **TIPS & WARNINGS**: Highlight the dos and don'ts for lesson users (50-100 words)
5. **Tags**: 3-5 relevant technical tags focusing on AI tools, technologies, business processes
6. **Difficulty**: Beginner/Intermediate/Advanced based on technical complexity
7. **Time to Implement**: Realistic estimate (e.g., "2-4 hours", "1-2 days")

Focus on:
- Specific, actionable information that others can replicate
- Quantified results and measurable outcomes
- Technical details and implementation specifics
- Clear problem-solution-impact narrative
- Practical tips that prevent common pitfalls

Return ONLY a valid JSON object with these exact keys: title, quickSummary, problem, solution, impact, tipsWarnings, tags, difficulty, timeToImplement`

export async function generateLessonFromContent(content: string): Promise<LessonData> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: ENHANCED_LESSON_PROMPT },
        { role: "user", content: `Please analyze this content and create a structured lesson:\n\n${content}` }
      ],
      temperature: 0.7,
      max_tokens: 1200,
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