// Enhanced demo AI service with Tips & Warnings
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

export async function generateLessonFromContent(content: string): Promise<LessonData> {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const hasAPI = content.toLowerCase().includes('api')
  const hasAutomation = content.toLowerCase().includes('automat')
  const hasDocument = content.toLowerCase().includes('document')
  const hasTime = content.match(/(\d+)\s*(hour|minute|day)/i)
  
  return {
    title: hasDocument ? 'Automated Document Processing Using AI Tools' : 'Streamlined Business Workflow Using AI',
    quickSummary: `Reduced manual processing time by ${hasTime ? '75%' : '60%'} through AI automation implementation, improving accuracy and scalability for high-volume operations.`,
    problem: `Manual ${hasDocument ? 'document review' : 'data processing'} was time-consuming and error-prone, creating bottlenecks in our workflow and limiting our ability to scale operations effectively.`,
    solution: `Implemented ${hasAPI ? 'API integration' : 'AI tools'} with custom prompts to automate the extraction and analysis of key information, creating a streamlined workflow with minimal human intervention.`,
    impact: `${hasTime ? '75%' : '60%'} time reduction, improved accuracy from 85% to 98%, and scalable solution capable of handling 10x more volume with consistent quality.`,
    tipsWarnings: `✅ Start with small pilot projects to validate approach. ✅ Invest time in prompt engineering for better results. ⚠️ Always validate AI outputs initially. ⚠️ Don't skip human oversight for critical decisions.`,
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