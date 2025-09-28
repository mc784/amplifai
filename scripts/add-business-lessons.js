const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

const prisma = new PrismaClient()

const businessLessons = [
  {
    title: "Fixed HR Onboarding Delays Using ChatGPT",
    subject: "Human Resources",
    gradeLevel: "Beginner",
    lessonJson: JSON.stringify({
      quickSummary: "Automated new hire documentation and FAQ responses using ChatGPT, reducing onboarding time from 3 days to 4 hours.",
      detailedSummary: {
        problem: "HR team was overwhelmed with repetitive onboarding questions and manual document creation for each new hire, causing delays and inconsistent information delivery.",
        solution: "Implemented ChatGPT to generate personalized onboarding documents, answer common questions, and create role-specific checklists automatically.",
        impact: "Reduced onboarding time by 87%, improved new hire satisfaction scores by 45%, and freed HR team to focus on strategic initiatives."
      },
      metadata: {
        aiTool: "ChatGPT",
        useCase: "HR Automation",
        team: "Human Resources",
        difficulty: "Beginner",
        timeToImplement: "1-2 weeks"
      },
      author: { name: "Lisa Park", email: "lpark@amazon.com" },
      stats: { views: 156, likes: 23, bookmarks: 12 },
      tags: ["hr", "onboarding", "chatgpt", "automation"],
      tips: ["Create template prompts for consistency", "Review generated content before sending"],
      warnings: ["Ensure compliance with company policies"]
    })
  },
  {
    title: "Fixed Inventory Forecasting Errors Using Amazon Forecast",
    subject: "Supply Chain",
    gradeLevel: "Advanced",
    lessonJson: JSON.stringify({
      quickSummary: "Improved inventory forecasting accuracy from 60% to 92% using Amazon Forecast ML service, reducing stockouts by 75%.",
      detailedSummary: {
        problem: "Manual inventory forecasting was highly inaccurate, leading to frequent stockouts and overstock situations, costing millions in lost sales and storage fees.",
        solution: "Deployed Amazon Forecast to analyze historical sales data, seasonal patterns, and external factors to generate accurate demand predictions.",
        impact: "Increased forecasting accuracy by 53%, reduced stockouts by 75%, decreased excess inventory by 40%, saving $2.3M annually."
      },
      metadata: {
        aiTool: "Amazon Forecast",
        useCase: "Demand Forecasting",
        team: "Supply Chain Operations",
        difficulty: "Advanced",
        timeToImplement: "8-12 weeks"
      },
      author: { name: "David Chen", email: "dchen@amazon.com" },
      stats: { views: 234, likes: 41, bookmarks: 28 },
      tags: ["forecasting", "supply-chain", "amazon-forecast", "ml"],
      tips: ["Clean historical data thoroughly", "Include external factors like holidays"],
      warnings: ["Requires significant data preparation", "Monitor model drift over time"]
    })
  },
  {
    title: "Fixed Code Review Bottlenecks Using GitHub Copilot",
    subject: "Software Development",
    gradeLevel: "Intermediate",
    lessonJson: JSON.stringify({
      quickSummary: "Accelerated code reviews by 60% using GitHub Copilot to automatically suggest improvements and catch common issues.",
      detailedSummary: {
        problem: "Code reviews were taking 2-3 days due to manual inspection for common issues, style violations, and security vulnerabilities, slowing down development cycles.",
        solution: "Integrated GitHub Copilot to pre-screen code for common issues, suggest improvements, and generate review comments, allowing reviewers to focus on architecture and logic.",
        impact: "Reduced review time by 60%, improved code quality scores by 35%, and accelerated deployment cycles from weekly to daily releases."
      },
      metadata: {
        aiTool: "GitHub Copilot",
        useCase: "Code Review Automation",
        team: "Engineering",
        difficulty: "Intermediate",
        timeToImplement: "2-3 weeks"
      },
      author: { name: "Alex Rodriguez", email: "arodriguez@amazon.com" },
      stats: { views: 189, likes: 32, bookmarks: 19 },
      tags: ["code-review", "github-copilot", "development", "automation"],
      tips: ["Train team on AI suggestions", "Maintain human oversight for critical changes"],
      warnings: ["Don't rely solely on AI for security reviews"]
    })
  },
  {
    title: "Fixed Marketing Campaign Analysis Using Claude",
    subject: "Marketing",
    gradeLevel: "Intermediate",
    lessonJson: JSON.stringify({
      quickSummary: "Automated marketing campaign performance analysis using Claude, reducing analysis time from 8 hours to 1 hour while improving insights quality.",
      detailedSummary: {
        problem: "Marketing team spent entire days manually analyzing campaign data across multiple platforms, often missing key insights and delaying optimization decisions.",
        solution: "Used Claude to automatically process campaign data, identify trends, generate insights, and create executive summaries with actionable recommendations.",
        impact: "Reduced analysis time by 87%, improved campaign ROI by 23%, and enabled real-time optimization decisions."
      },
      metadata: {
        aiTool: "Claude",
        useCase: "Marketing Analytics",
        team: "Digital Marketing",
        difficulty: "Intermediate",
        timeToImplement: "3-4 weeks"
      },
      author: { name: "Maria Gonzalez", email: "mgonzalez@amazon.com" },
      stats: { views: 167, likes: 29, bookmarks: 15 },
      tags: ["marketing", "analytics", "claude", "campaigns"],
      tips: ["Standardize data formats across platforms", "Create template analysis frameworks"],
      warnings: ["Validate AI insights with domain expertise"]
    })
  },
  {
    title: "Fixed Customer Churn Prediction Using SageMaker",
    subject: "Customer Analytics",
    gradeLevel: "Advanced",
    lessonJson: JSON.stringify({
      quickSummary: "Built customer churn prediction model using Amazon SageMaker, achieving 89% accuracy and reducing churn by 34%.",
      detailedSummary: {
        problem: "Customer churn was unpredictable, leading to reactive rather than proactive retention strategies and significant revenue loss.",
        solution: "Developed ML model using SageMaker to analyze customer behavior patterns and predict churn probability, enabling targeted retention campaigns.",
        impact: "Achieved 89% prediction accuracy, reduced churn by 34%, increased customer lifetime value by $1.2M annually."
      },
      metadata: {
        aiTool: "Amazon SageMaker",
        useCase: "Churn Prediction",
        team: "Customer Analytics",
        difficulty: "Advanced",
        timeToImplement: "10-14 weeks"
      },
      author: { name: "Dr. Sarah Kim", email: "skim@amazon.com" },
      stats: { views: 298, likes: 52, bookmarks: 37 },
      tags: ["churn-prediction", "sagemaker", "ml", "customer-analytics"],
      tips: ["Feature engineering is crucial", "Regular model retraining needed"],
      warnings: ["Requires clean, comprehensive customer data"]
    })
  }
]

async function addBusinessLessons() {
  try {
    for (const lesson of businessLessons) {
      const contentHash = crypto.createHash('md5').update(lesson.lessonJson).digest('hex')
      
      await prisma.lesson.create({
        data: {
          ...lesson,
          contentHash,
          originalFilename: `${lesson.title.toLowerCase().replace(/\s+/g, '-')}.txt`
        }
      })
    }
    
    console.log(`${businessLessons.length} business lessons added successfully!`)
  } catch (error) {
    console.error('Error adding business lessons:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addBusinessLessons()