import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateLessonFromContent(content: string) {
  const prompt = `Create a lesson plan from this content: ${content.substring(0, 3000)}

Format as JSON with these fields:
- title: Clear lesson title
- quickSummary: 1-2 sentence overview
- problem: What challenge/topic this addresses
- solution: How the lesson solves it
- impact: Expected learning outcomes
- tipsWarnings: Important notes for implementation
- tags: Array of 3-5 relevant tags
- difficulty: "Beginner", "Intermediate", or "Advanced"
- timeToImplement: Estimated time needed`

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

export async function generateTagsFromContent(content: string) {
  const prompt = `Generate 5-7 educational tags for this content: ${content.substring(0, 1000)}`
  
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  })

  return response.choices[0].message.content?.split(',').map(tag => tag.trim()) || []
}