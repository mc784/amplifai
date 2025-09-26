export interface Lesson {
  id: string
  title: string
  quickSummary: string
  detailedSummary: {
    problem: string
    solution: string
    impact: string
  }
  tips: string[]
  warnings: string[]
  tags: string[]
  metadata: {
    aiTool: string
    useCase: string
    team: string
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    timeToImplement: string
  }
  author: {
    name: string
    email: string
    contactPreference: 'email' | 'slack' | 'both' | 'none'
  }
  stats: {
    views: number
    likes: number
    bookmarks: number
  }
  customAiTool?: {
    name: string
    description: string
    githubUrl?: string
    documentationUrl?: string
  }
  promptUsed?: {
    title: string
    content: string
    notes?: string
  }
  createdAt: string
  updatedAt: string
}

export interface SearchQuery {
  query: string
  filters?: {
    aiTool?: string
    useCase?: string
    difficulty?: string
    team?: string
  }
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}