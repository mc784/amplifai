require('dotenv').config({ path: '.env.production' })
const { PrismaClient } = require('@prisma/client')
const sqlite3 = require('sqlite3').verbose()

const prodPrisma = new PrismaClient()

async function migrateAllLessons() {
  try {
    console.log('Migrating all lessons from local to production...')
    
    // Read from local lessons.db
    const db = new sqlite3.Database('./prisma/lessons.db')
    
    const lessons = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM lessons', (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
    
    console.log(`Found ${lessons.length} lessons in local database`)
    
    // Migrate each lesson to production
    let migrated = 0
    for (const lesson of lessons) {
      try {
        await prodPrisma.lesson.upsert({
          where: { id: lesson.id },
          update: {
            title: lesson.title,
            contentHash: lesson.contentHash,
            originalFilename: lesson.originalFilename,
            fileType: lesson.fileType,
            lessonJson: lesson.lessonJson,
            subject: lesson.subject,
            gradeLevel: lesson.gradeLevel,
            tags: lesson.tags,
            createdAt: new Date(lesson.createdAt),
            updatedAt: new Date(lesson.updatedAt)
          },
          create: {
            id: lesson.id,
            title: lesson.title,
            contentHash: lesson.contentHash,
            originalFilename: lesson.originalFilename,
            fileType: lesson.fileType,
            lessonJson: lesson.lessonJson,
            subject: lesson.subject,
            gradeLevel: lesson.gradeLevel,
            tags: lesson.tags,
            createdAt: new Date(lesson.createdAt),
            updatedAt: new Date(lesson.updatedAt)
          }
        })
        migrated++
        if (migrated % 10 === 0) {
          console.log(`Migrated ${migrated}/${lessons.length} lessons...`)
        }
      } catch (error) {
        console.error(`Error migrating lesson ${lesson.id}:`, error.message)
      }
    }
    
    const finalCount = await prodPrisma.lesson.count()
    console.log(`Migration complete! Production database now has ${finalCount} lessons`)
    
    db.close()
    
  } catch (error) {
    console.error('Migration error:', error)
  } finally {
    await prodPrisma.$disconnect()
  }
}

migrateAllLessons()