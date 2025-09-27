// Demo AI service for testing without API keys
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

export async function generateLessonFromContent(content: string): Promise<LessonData> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Extract key information from content
  const hasAPI = content.toLowerCase().includes('api')
  const hasAutomation = content.toLowerCase().includes('automat')
  const hasDocument = content.toLowerCase().includes('document')
  const hasTime = content.match(/(\d+)\s*(hour|minute|day)/i)
  
  // Generate realistic lesson based on content analysis
  return {
    title: hasDocument ? 'Automated Document Processing Using AI' : 'Streamlined Workflow Using AI Tools',
    quickSummary: `Reduced manual processing time by ${hasTime ? '75%' : '60%'} through AI automation implementation.`,
    problem: `Manual ${hasDocument ? 'document review' : 'data processing'} was time-consuming and error-prone, creating bottlenecks in our workflow.`,
    solution: `Implemented ${hasAPI ? 'API integration' : 'AI tools'} with custom prompts to automate the extraction and analysis of key information.`,
    impact: `${hasTime ? '75%' : '60%} time reduction, improved accuracy, and scalable solution for handling large volumes.`,
    tags: [
      ...(hasAPI ? ['API Integration'] : []),
      ...(hasAutomation ? ['Automation'] : []),
      ...(hasDocument ? ['Document Processing'] : ['Data Processing']),
      'AI Implementation',
      'Time Savings'
    ],
    difficulty: hasAPI ? 'Intermediate' : 'Beginner',
    timeToImplement: hasAPI ? '4-6 hours' : '2-3 hours'
  }
}

export async function generateTagsFromContent(content: string): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const tags = []
  if (content.toLowerCase().includes('claude')) tags.push('Claude API')
  if (content.toLowerCase().includes('gpt')) tags.push('GPT')
  if (content.toLowerCase().includes('document')) tags.push('Document Processing')
  if (content.toLowerCase().includes('automat')) tags.push('Automation')
  if (content.toLowerCase().includes('workflow')) tags.push('Workflow Optimization')
  if (content.toLowerCase().includes('time')) tags.push('Time Savings')
  
  return tags.length > 0 ? tags : ['AI Implementation', 'Process Improvement']
}