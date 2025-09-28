const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

const prisma = new PrismaClient()

const sampleLessons = [
  {
    title: "Fixed Document Processing Delays Using Claude AI",
    subject: "Document Processing",
    gradeLevel: "Intermediate",
    lessonJson: JSON.stringify({
      quickSummary: "Automated document processing using Claude AI to reduce manual review time from 4 hours to 15 minutes per document.",
      detailedSummary: {
        problem: "Our legal team was spending 4+ hours manually reviewing and extracting key information from complex contracts and legal documents. This created bottlenecks in deal approvals and increased operational costs.",
        solution: "Implemented Claude AI to automatically extract key contract terms, identify potential risks, and generate structured summaries. The AI processes documents in minutes and highlights areas requiring human review.",
        impact: "Reduced document processing time by 94%, improved accuracy by eliminating human error in data extraction, and freed up legal team to focus on strategic analysis rather than manual data entry."
      },
      metadata: {
        aiTool: "Claude AI",
        useCase: "Document Processing",
        team: "Legal Operations",
        difficulty: "Intermediate",
        timeToImplement: "2-3 weeks"
      },
      author: {
        name: "Sarah Chen",
        email: "schen@amazon.com"
      },
      stats: {
        views: 245,
        likes: 32,
        bookmarks: 18
      },
      tags: ["document-processing", "legal", "automation", "claude"],
      tips: [
        "Start with a small batch of documents to test accuracy",
        "Create clear prompts for consistent extraction",
        "Always have human review for critical decisions"
      ],
      warnings: [
        "Ensure sensitive data is properly handled",
        "Test thoroughly before full deployment"
      ],
      promptUsed: {
        title: "Contract Analysis Prompt",
        content: "Analyze this contract and extract: 1) Key terms and conditions 2) Payment schedules 3) Termination clauses 4) Risk factors 5) Action items. Format as structured JSON.",
        notes: "Customize fields based on your specific document types"
      }
    })
  },
  {
    title: "Fixed Customer Support Backlog Using GPT-4",
    subject: "Customer Support",
    gradeLevel: "Beginner",
    lessonJson: JSON.stringify({
      quickSummary: "Automated first-level customer support responses using GPT-4, reducing response time from 24 hours to 2 minutes.",
      detailedSummary: {
        problem: "Customer support team was overwhelmed with 500+ daily inquiries, leading to 24-hour response times and frustrated customers. Many inquiries were repetitive and could be resolved with standard information.",
        solution: "Deployed GPT-4 powered chatbot to handle common inquiries automatically. The AI provides instant responses for FAQ, order status, and basic troubleshooting while escalating complex issues to human agents.",
        impact: "Reduced average response time by 98%, improved customer satisfaction scores by 40%, and allowed support team to focus on complex issues requiring human expertise."
      },
      metadata: {
        aiTool: "GPT-4",
        useCase: "Customer Support",
        team: "Customer Experience",
        difficulty: "Beginner",
        timeToImplement: "1-2 weeks"
      },
      author: {
        name: "Mike Rodriguez",
        email: "mrodriguez@amazon.com"
      },
      stats: {
        views: 189,
        likes: 28,
        bookmarks: 15
      },
      tags: ["customer-support", "chatbot", "automation", "gpt-4"],
      tips: [
        "Train the AI on your specific FAQ database",
        "Set clear escalation triggers",
        "Monitor conversations for quality"
      ],
      warnings: [
        "Always provide option to reach human agent",
        "Regular review of AI responses needed"
      ],
      promptUsed: {
        title: "Customer Support Response Prompt",
        content: "You are a helpful customer support agent. Answer this inquiry professionally and concisely. If you cannot resolve the issue, politely escalate to a human agent.",
        notes: "Include company-specific policies and procedures"
      }
    })
  }
]

async function addSampleLessons() {
  try {
    for (const lesson of sampleLessons) {
      const contentHash = crypto.createHash('md5').update(lesson.lessonJson).digest('hex')
      
      await prisma.lesson.create({
        data: {
          ...lesson,
          contentHash,
          originalFilename: `${lesson.title.toLowerCase().replace(/\s+/g, '-')}.txt`
        }
      })
    }
    
    console.log('Sample lessons added successfully!')
  } catch (error) {
    console.error('Error adding sample lessons:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addSampleLessons()