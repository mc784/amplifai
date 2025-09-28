const { PrismaClient } = require('@prisma/client')

// Use production DATABASE_URL from environment
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function seedProduction() {
  try {
    console.log('Seeding production database...')
    
    // Add sample lessons one by one
    await prisma.lesson.create({
      data: {
        id: 'lesson-1',
        title: 'AI-Powered Customer Service Automation',
        contentHash: 'hash-1',
        originalFilename: 'customer-service.md',
        fileType: 'markdown',
        lessonJson: JSON.stringify({
          title: 'AI-Powered Customer Service Automation',
          quickSummary: 'Implemented Claude AI to automate 80% of customer inquiries, reducing response time from hours to seconds.',
          detailedSummary: {
            problem: 'High volume of repetitive customer inquiries overwhelming support team',
            solution: 'Integrated Claude AI with existing ticketing system to handle common queries',
            impact: '80% reduction in manual tickets, 95% customer satisfaction rate'
          },
          tips: ['Start with FAQ automation', 'Train on historical tickets', 'Implement escalation rules'],
          warnings: ['Monitor for edge cases', 'Maintain human oversight'],
          tags: ['customer-service', 'automation', 'claude'],
          metadata: {
            aiTool: 'Claude',
            useCase: 'Customer Support',
            team: 'Customer Experience',
            difficulty: 'Intermediate',
            timeToImplement: '2-3 weeks'
          },
          author: {
            name: 'Demo User',
            email: 'demo@amazon.com',
            contactPreference: 'email'
          },
          stats: {
            views: 245,
            likes: 32,
            bookmarks: 18
          }
        })
      }
    })
    
    const count = await prisma.lesson.count()
    console.log(`Production database now has ${count} lessons`)
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Lessons already exist in production database')
    } else {
      console.error('Seeding error:', error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

seedProduction()