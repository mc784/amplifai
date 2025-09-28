const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

const prisma = new PrismaClient()

const comprehensiveLesson = {
  title: "Fixed Data Analysis Bottlenecks Using Amazon Bedrock",
  subject: "Data Analytics",
  gradeLevel: "Advanced",
  lessonJson: JSON.stringify({
    quickSummary: "Automated complex data analysis using Amazon Bedrock Claude, reducing analysis time from 8 hours to 30 minutes while improving accuracy by 85%.",
    detailedSummary: {
      problem: "Our data science team was spending 8+ hours manually analyzing customer behavior patterns from multiple data sources. The process was error-prone, inconsistent, and created significant delays in business decision-making. Manual correlation of data points often missed critical insights.",
      solution: "Implemented Amazon Bedrock with Claude to automatically process and analyze large datasets, identify patterns, generate insights, and create comprehensive reports. The AI system processes multiple data formats and provides structured analysis with confidence scores.",
      impact: "Reduced analysis time by 94%, improved accuracy by 85%, enabled real-time insights for business decisions, and freed up data scientists to focus on strategic modeling rather than routine analysis tasks. Monthly reporting cycle shortened from 2 weeks to 2 days."
    },
    metadata: {
      aiTool: "Amazon Bedrock (Claude)",
      useCase: "Data Analysis & Reporting",
      team: "Data Science & Analytics",
      difficulty: "Advanced",
      timeToImplement: "4-6 weeks",
      costSavings: "$50,000/month",
      roi: "300%",
      businessUnit: "Analytics Division"
    },
    author: {
      name: "Dr. Jennifer Liu",
      email: "jliu@amazon.com",
      title: "Senior Data Scientist",
      team: "Analytics Division",
      contactPreference: "email"
    },
    stats: {
      views: 892,
      likes: 127,
      bookmarks: 89,
      shares: 34,
      comments: 23
    },
    tags: ["data-analysis", "bedrock", "claude", "automation", "reporting", "analytics", "machine-learning"],
    tips: [
      "Start with a small dataset to validate accuracy before scaling",
      "Create clear data schemas for consistent processing",
      "Implement confidence thresholds for automated decisions",
      "Set up monitoring for data quality and AI performance",
      "Train team on interpreting AI-generated insights"
    ],
    warnings: [
      "Ensure data privacy compliance before processing sensitive information",
      "Validate AI insights with domain experts initially",
      "Monitor for bias in automated analysis results",
      "Have fallback procedures for system downtime"
    ],
    promptUsed: {
      title: "Data Analysis & Insight Generation",
      content: "Analyze the provided dataset and generate insights following this structure:\n\n1. DATA SUMMARY (100-150 words)\n- Key metrics and trends identified\n- Data quality assessment\n- Notable patterns or anomalies\n\n2. BUSINESS INSIGHTS (200-250 words)\n- Customer behavior patterns\n- Revenue impact analysis\n- Market trend implications\n- Risk factors identified\n\n3. RECOMMENDATIONS (150-200 words)\n- Immediate action items\n- Strategic recommendations\n- Resource allocation suggestions\n\n4. CONFIDENCE METRICS\n- Analysis confidence score (1-10)\n- Data completeness percentage\n- Potential bias indicators\n\nFormat as structured JSON with confidence scores for each insight.",
      notes: "Customize analysis categories based on your specific business metrics and KPIs",
      version: "2.1",
      lastUpdated: "2024-01-15"
    },
    implementation: {
      steps: [
        "Set up Amazon Bedrock access and permissions",
        "Create data ingestion pipeline",
        "Configure Claude model parameters",
        "Develop analysis prompt templates",
        "Build automated reporting system",
        "Test with historical data",
        "Deploy to production environment"
      ],
      timeline: "6 weeks",
      resources: ["AWS Bedrock", "S3 Data Lake", "Lambda Functions", "CloudWatch"],
      prerequisites: ["AWS Account", "Data Engineering Team", "Business Stakeholder Buy-in"]
    },
    results: {
      beforeMetrics: {
        analysisTime: "8 hours",
        accuracy: "65%",
        reportingCycle: "2 weeks",
        teamUtilization: "40%"
      },
      afterMetrics: {
        analysisTime: "30 minutes",
        accuracy: "85%",
        reportingCycle: "2 days",
        teamUtilization: "90%"
      },
      businessImpact: {
        costSavings: "$50,000/month",
        timeReduction: "94%",
        accuracyImprovement: "31%",
        teamProductivity: "125%"
      }
    },
    relatedLessons: ["bedrock-document-processing", "claude-customer-insights", "ai-reporting-automation"],
    lastUpdated: "2024-01-15T10:30:00Z",
    version: "1.2"
  })
}

async function addComprehensiveLesson() {
  try {
    const contentHash = crypto.createHash('md5').update(comprehensiveLesson.lessonJson).digest('hex')
    
    await prisma.lesson.create({
      data: {
        ...comprehensiveLesson,
        contentHash,
        originalFilename: `${comprehensiveLesson.title.toLowerCase().replace(/\s+/g, '-')}.txt`
      }
    })
    
    console.log('Comprehensive lesson added successfully!')
  } catch (error) {
    console.error('Error adding comprehensive lesson:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addComprehensiveLesson()