const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

// Load production environment
require('dotenv').config({ path: '.env.production' })

async function migrateProduction() {
  const prisma = new PrismaClient()
  
  try {
    // Run migration
    console.log('Running production migration...')
    await prisma.$executeRaw`SELECT 1`
    console.log('Connected to production database')
    
    // Check if lessons table exists and has data
    const count = await prisma.lesson.count()
    console.log(`Current lessons in production: ${count}`)
    
    if (count === 0) {
      console.log('Production database is empty. Need to seed with lessons.')
    }
    
  } catch (error) {
    console.error('Migration error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateProduction()