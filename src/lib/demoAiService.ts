export async function generateLessonFromContent(content: string) {
  // Extract key topics from content for more realistic responses
  const keywords = extractKeywords(content)
  const subject = detectSubject(content)
  const gradeLevel = detectGradeLevel(content)
  
  return {
    title: generateTitle(keywords, subject),
    quickSummary: generateSummary(keywords, subject),
    problem: generateProblem(keywords, subject),
    solution: generateSolution(keywords, subject),
    impact: generateImpact(keywords, subject, gradeLevel),
    tipsWarnings: generateTips(subject),
    tags: keywords.slice(0, 5),
    difficulty: gradeLevel,
    timeToImplement: estimateTime(content.length)
  }
}

export async function generateTagsFromContent(content: string) {
  return extractKeywords(content).slice(0, 7)
}

function extractKeywords(content: string): string[] {
  const text = content.toLowerCase()
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall', 'this', 'that', 'these', 'those', 'a', 'an']
  
  const words = text.match(/\b[a-z]{3,}\b/g) || []
  const wordCount: { [key: string]: number } = {}
  
  words.forEach(word => {
    if (!commonWords.includes(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1
    }
  })
  
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1))
}

function detectSubject(content: string): string {
  const text = content.toLowerCase()
  
  if (text.includes('math') || text.includes('algebra') || text.includes('geometry') || text.includes('calculus') || text.includes('equation')) return 'Mathematics'
  if (text.includes('science') || text.includes('biology') || text.includes('chemistry') || text.includes('physics') || text.includes('experiment')) return 'Science'
  if (text.includes('history') || text.includes('historical') || text.includes('ancient') || text.includes('civilization')) return 'History'
  if (text.includes('english') || text.includes('literature') || text.includes('writing') || text.includes('grammar') || text.includes('reading')) return 'English Language Arts'
  if (text.includes('art') || text.includes('drawing') || text.includes('painting') || text.includes('creative')) return 'Arts'
  if (text.includes('music') || text.includes('instrument') || text.includes('song') || text.includes('rhythm')) return 'Music'
  if (text.includes('geography') || text.includes('map') || text.includes('country') || text.includes('continent')) return 'Geography'
  if (text.includes('computer') || text.includes('coding') || text.includes('programming') || text.includes('technology')) return 'Technology'
  
  return 'General Studies'
}

function detectGradeLevel(content: string): string {
  const text = content.toLowerCase()
  const wordCount = content.split(' ').length
  const avgWordLength = content.replace(/[^a-zA-Z]/g, '').length / wordCount
  
  if (text.includes('kindergarten') || text.includes('preschool')) return 'Beginner'
  if (text.includes('elementary') || text.includes('primary') || avgWordLength < 4) return 'Beginner'
  if (text.includes('middle school') || text.includes('junior high') || (avgWordLength >= 4 && avgWordLength < 5)) return 'Intermediate'
  if (text.includes('high school') || text.includes('advanced') || avgWordLength >= 5) return 'Advanced'
  
  return wordCount < 100 ? 'Beginner' : wordCount < 500 ? 'Intermediate' : 'Advanced'
}

function generateTitle(keywords: string[], subject: string): string {
  const mainTopic = keywords[0] || 'Learning'
  const templates = [
    `Understanding ${mainTopic} in ${subject}`,
    `${mainTopic}: A Comprehensive ${subject} Lesson`,
    `Exploring ${mainTopic} Through ${subject}`,
    `${subject}: ${mainTopic} Fundamentals`,
    `Interactive ${mainTopic} Learning in ${subject}`
  ]
  return templates[Math.floor(Math.random() * templates.length)]
}

function generateSummary(keywords: string[], subject: string): string {
  const mainTopic = keywords[0] || 'key concepts'
  return `This lesson introduces students to ${mainTopic} through engaging ${subject.toLowerCase()} activities and real-world applications.`
}

function generateProblem(keywords: string[], subject: string): string {
  const mainTopic = keywords[0] || 'this topic'
  const problems = [
    `Students often struggle to understand ${mainTopic} without concrete examples and hands-on practice.`,
    `Traditional teaching methods for ${mainTopic} can be abstract and difficult for students to grasp.`,
    `Many students lack engagement when learning about ${mainTopic} in ${subject.toLowerCase()}.`,
    `Students need better connection between ${mainTopic} concepts and real-world applications.`
  ]
  return problems[Math.floor(Math.random() * problems.length)]
}

function generateSolution(keywords: string[], subject: string): string {
  const mainTopic = keywords[0] || 'the concept'
  const solutions = [
    `Interactive activities and visual aids help students understand ${mainTopic} through multiple learning modalities.`,
    `Hands-on experiments and group work make ${mainTopic} more accessible and engaging for all learners.`,
    `Real-world examples and case studies connect ${mainTopic} to students' everyday experiences.`,
    `Step-by-step guided practice with immediate feedback builds confidence in ${mainTopic} mastery.`
  ]
  return solutions[Math.floor(Math.random() * solutions.length)]
}

function generateImpact(keywords: string[], subject: string, difficulty: string): string {
  const mainTopic = keywords[0] || 'these concepts'
  const impacts = [
    `Students will demonstrate improved understanding of ${mainTopic} through assessments and practical applications.`,
    `Increased student engagement and participation in ${subject.toLowerCase()} discussions and activities.`,
    `Better retention of ${mainTopic} knowledge and ability to apply concepts to new situations.`,
    `Enhanced critical thinking skills and confidence in ${subject.toLowerCase()} problem-solving.`
  ]
  return impacts[Math.floor(Math.random() * impacts.length)]
}

function generateTips(subject: string): string {
  const tips = [
    `Ensure all students have necessary materials before beginning activities. Monitor group work closely for understanding.`,
    `Provide additional support for struggling learners through peer tutoring or modified assignments.`,
    `Use formative assessment throughout the lesson to gauge student comprehension and adjust pacing as needed.`,
    `Connect lesson content to students' prior knowledge and experiences for better retention.`,
    `Encourage questions and create a safe environment for students to express confusion or curiosity.`
  ]
  return tips[Math.floor(Math.random() * tips.length)]
}

function estimateTime(contentLength: number): string {
  if (contentLength < 500) return '30-45 minutes'
  if (contentLength < 1500) return '45-60 minutes'
  if (contentLength < 3000) return '60-90 minutes'
  return '90+ minutes'
}