require('dotenv').config({ path: '.env.production' })
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkProductionDb() {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...')
    
    const count = await prisma.lesson.count()
    console.log(`Lessons in production database: ${count}`)
    
    if (count > 0) {
      const lessons = await prisma.lesson.findMany({ take: 2 })
      console.log('Sample lessons:', lessons.map(l => ({ id: l.id, title: l.title })))
    }
    
  } catch (error) {
    console.error('Database check error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkProductionDb()