const { PrismaClient } = require('@prisma/client')

async function setupProductionDb() {
  const prisma = new PrismaClient()
  
  try {
    // Create tables
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS lessons (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        contentHash TEXT UNIQUE NOT NULL,
        originalFilename TEXT,
        fileType TEXT,
        lessonJson TEXT NOT NULL,
        subject TEXT,
        gradeLevel TEXT,
        tags TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    console.log('Production database setup complete')
  } catch (error) {
    console.error('Database setup error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  setupProductionDb()
}

module.exports = { setupProductionDb }