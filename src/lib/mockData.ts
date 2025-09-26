import { Lesson } from '@/types'

export const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Fixed Document Review Bottlenecks Using Claude',
    quickSummary: 'Eliminated 4-6 hour manual document reviews by implementing Claude API automation, reducing review time by 80%.',
    detailedSummary: {
      problem: 'Manual document review was taking 4-6 hours per document, creating bottlenecks in our workflow and delaying project timelines. Our team of 12 reviewers was overwhelmed with 50+ documents weekly, leading to inconsistent quality and missed deadlines. Senior staff spent most of their time on routine reviews instead of strategic work.',
      solution: 'Integrated Claude API with custom prompts for structured extraction of key information, challenges, and recommendations from documents. Built a web interface with drag-and-drop upload, automated categorization, and confidence scoring. Implemented parallel processing for multiple documents and created templates for different document types including technical specs, proposals, and compliance reports.',
      impact: '80% time reduction from 5 hours to 1 hour per document, improved accuracy with 95% consistency rate, scalable to 1000+ documents monthly. Freed up 40 hours weekly for senior staff strategic work, reduced review backlog from 2 weeks to 2 days, and improved client satisfaction scores by 35%. ROI achieved within 3 months through efficiency gains.'
    },
    tips: ['Use structured prompts for consistent output', 'Implement retry logic for API failures', 'Cache results to reduce costs'],
    warnings: ['Monitor API costs carefully', 'Always validate AI outputs', 'Have human oversight for critical documents'],
    tags: ['Claude API', 'Document Processing', 'Automation', 'NLP'],
    metadata: {
      aiTool: 'Claude API',
      useCase: 'Document Analysis',
      team: 'Engineering Productivity',
      difficulty: 'Intermediate',
      timeToImplement: '2-3 weeks'
    },
    author: {
      name: 'Sarah Chen',
      email: 'schen@amazon.com',
      contactPreference: 'email'
    },
    stats: { views: 1245, likes: 89, bookmarks: 67 },
    promptUsed: {
      title: 'Document Analysis Prompt',
      content: 'Analyze this document and extract: 1) Key challenges mentioned 2) Proposed solutions 3) Expected outcomes 4) Risk factors. Format as structured JSON with clear sections.',
      notes: 'Works best with technical documents. Adjust for different document types.'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Eliminated Code Review Delays Using GPT-4',
    quickSummary: 'Solved senior engineer bottlenecks by building automated code review system with GPT-4, speeding up cycles by 40%.',
    detailedSummary: {
      problem: 'Code reviews were bottlenecked by senior engineers, causing delays in deployment cycles and reducing team velocity. With 8 senior engineers reviewing 200+ pull requests weekly, average review time was 3-4 days. Junior developers waited extensively for feedback, impacting learning and productivity. Critical releases were delayed due to review queues.',
      solution: 'GPT-4 integration for initial automated review with custom prompts trained on our coding standards and common issues. Built GitHub integration with automated commenting, severity scoring, and smart routing to appropriate reviewers. Created custom rules engine for different code types and implemented learning feedback loop from human reviewer corrections.',
      impact: '40% faster review cycles from 3.5 days to 2.1 days average, improved code quality with 25% fewer bugs in production, reduced senior engineer review workload by 60%. Enhanced junior developer onboarding with instant feedback, increased deployment frequency by 30%, and improved team satisfaction scores. Prevented 15+ critical bugs through enhanced detection.'
    },
    tips: ['Train on your specific coding standards', 'Use context-aware prompts', 'Implement confidence scoring'],
    warnings: ['Human oversight still essential', 'False positives are common', 'Keep security reviews manual'],
    tags: ['GPT-4', 'Code Review', 'DevOps', 'Quality Assurance'],
    metadata: {
      aiTool: 'GPT-4',
      useCase: 'Code Review',
      team: 'Platform Engineering',
      difficulty: 'Advanced',
      timeToImplement: '4-6 weeks'
    },
    author: {
      name: 'Mike Rodriguez',
      email: 'mrodriguez@amazon.com',
      contactPreference: 'slack'
    },
    stats: { views: 987, likes: 76, bookmarks: 54 },
    customAiTool: {
      name: 'CodeReview Assistant',
      description: 'Custom GPT-4 wrapper with our coding standards and common issue patterns built-in',
      githubUrl: 'https://github.com/amazon-internal/code-review-assistant',
      documentationUrl: 'https://wiki.amazon.com/code-review-assistant'
    },
    promptUsed: {
      title: 'Code Review Prompt',
      content: 'Review this code for: 1) Adherence to our style guide 2) Potential bugs 3) Performance issues 4) Security concerns. Rate confidence 1-10 for each finding.',
      notes: 'Include context about the codebase and recent changes for better results.'
    },
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'Solved Slow Support Responses Using Bedrock RAG',
    quickSummary: 'Fixed 60% time waste in documentation searches by deploying Bedrock RAG system for instant customer support answers.',
    detailedSummary: {
      problem: 'Customer support agents spent 60% of their time searching for answers in documentation, leading to long response times averaging 45 minutes per ticket. Our knowledge base had 10,000+ articles across multiple systems, making information retrieval inefficient. Customer satisfaction scores were declining due to slow responses and inconsistent answers from different agents.',
      solution: 'Built RAG system with Amazon Bedrock and vector database for instant retrieval of relevant information from knowledge base. Implemented semantic search with Claude for answer generation, created agent dashboard with confidence scoring, and integrated with existing ticketing system. Added feedback loop for continuous improvement and multi-language support for global customers.',
      impact: '60% faster response times from 45 to 18 minutes average, 95% accuracy rate in answer relevance, improved customer satisfaction scores from 3.2 to 4.6 out of 5. Reduced agent training time from 3 weeks to 1 week, handled 40% more tickets with same team size, and decreased escalation rates by 50%. Generated $2M annual savings through efficiency gains.'
    },
    tips: ['Chunk documents properly for better retrieval', 'Use hybrid search combining semantic and keyword', 'Regular embedding updates'],
    warnings: ['Monitor for hallucinations', 'Keep embeddings updated', 'Validate critical information manually'],
    tags: ['Amazon Bedrock', 'RAG', 'Customer Support', 'Vector Database'],
    metadata: {
      aiTool: 'Amazon Bedrock',
      useCase: 'Customer Support',
      team: 'Customer Experience',
      difficulty: 'Beginner',
      timeToImplement: '1-2 weeks'
    },
    author: {
      name: 'Alex Kim',
      email: 'alexk@amazon.com',
      contactPreference: 'both'
    },
    stats: { views: 1567, likes: 123, bookmarks: 98 },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '4',
    title: 'Fixed Missing Action Items Using Whisper Automation',
    quickSummary: 'Eliminated inconsistent meeting notes and missed action items using OpenAI Whisper, saving 5 hours weekly.',
    detailedSummary: {
      problem: 'Manual meeting note-taking was inconsistent and time-consuming, with important action items often missed or unclear. Our team of 25 people had 40+ meetings weekly, with 30% of action items lost or forgotten. Follow-up rates were poor at 45%, and meeting effectiveness scores were low. Administrative overhead consumed 8 hours weekly per team member.',
      solution: 'Implemented OpenAI Whisper for transcription with GPT-4 for action item extraction and meeting summary generation. Built automated system with speaker identification, real-time processing, and integration with project management tools. Created smart templates for different meeting types and automated follow-up email generation with assigned owners and deadlines.',
      impact: '5 hours saved per week per team member (125 total hours weekly), 90% accuracy in action item identification, improved meeting follow-up rates from 45% to 92%. Reduced missed deadlines by 70%, increased project completion rates by 35%, and improved team accountability scores. Generated measurable productivity gains worth $180K annually through better meeting outcomes.'
    },
    tips: ['Use speaker diarization for clarity', 'Post-process with GPT for summaries', 'Implement confidence thresholds'],
    warnings: ['Audio quality affects accuracy', 'Privacy considerations for recordings', 'Review sensitive content manually'],
    tags: ['OpenAI Whisper', 'Meeting Automation', 'Transcription', 'Productivity'],
    metadata: {
      aiTool: 'OpenAI Whisper',
      useCase: 'Meeting Automation',
      team: 'Operations',
      difficulty: 'Intermediate',
      timeToImplement: '2-3 weeks'
    },
    author: {
      name: 'Jennifer Wu',
      email: 'jwu@amazon.com',
      contactPreference: 'email'
    },
    stats: { views: 834, likes: 62, bookmarks: 41 },
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: '5',
    title: 'Cut Marketing Design Costs Using Stable Diffusion',
    quickSummary: 'Reduced expensive design resources and long turnarounds by 70% using Stable Diffusion for marketing asset generation.',
    detailedSummary: {
      problem: 'Marketing campaigns required expensive external design resources costing $50K monthly and had long turnaround times of 2-3 weeks for visual assets. Our team needed 200+ unique visuals monthly for various campaigns, but external agencies were slow and costly. Brand consistency was challenging with multiple vendors, and last-minute changes were expensive.',
      solution: 'Deployed Stable Diffusion with custom training on brand guidelines to generate marketing visuals and product mockups. Built web interface with brand-compliant templates, batch generation capabilities, and automated quality checks. Integrated with existing design workflow and created approval system with version control and asset management.',
      impact: '70% cost reduction from $50K to $15K monthly, 5x faster asset creation from 3 weeks to 3 days, consistent brand compliance with 98% approval rate. Increased campaign iteration speed by 400%, enabled A/B testing with multiple creative variants, and improved marketing ROI by 45%. Generated $420K annual savings while improving creative output quality and speed.'
    },
    tips: ['Train on brand-specific imagery', 'Use ControlNet for precise layouts', 'Batch generate variations'],
    warnings: ['Review for brand compliance', 'Check for copyright issues', 'Human approval for final assets'],
    tags: ['Stable Diffusion', 'Marketing', 'Image Generation', 'Creative AI'],
    metadata: {
      aiTool: 'Stable Diffusion',
      useCase: 'Marketing',
      team: 'Creative Services',
      difficulty: 'Advanced',
      timeToImplement: '3-4 weeks'
    },
    author: {
      name: 'David Park',
      email: 'dpark@amazon.com',
      contactPreference: 'slack'
    },
    stats: { views: 1123, likes: 87, bookmarks: 73 },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: '6',
    title: 'Eliminated Invoice Processing Delays Using Claude',
    quickSummary: 'Fixed 3-day invoice processing bottlenecks by automating data extraction with Claude, achieving 85% faster processing.',
    detailedSummary: {
      problem: 'Manual invoice processing took 3 days per batch with high error rates of 15%, creating cash flow issues and vendor relationship problems. Our accounts payable team processed 500+ invoices weekly, requiring manual data entry, validation, and approval routing. Staff overtime was common, and processing costs were $25 per invoice due to manual effort.',
      solution: 'Implemented Claude API for automated invoice data extraction with custom prompts for different vendor formats. Built workflow system with automatic validation rules, exception handling, and integration with ERP system. Created approval routing based on amount thresholds and vendor categories, with real-time status tracking and automated notifications to stakeholders.',
      impact: '85% faster processing from 3 days to 4 hours, reduced error rates from 15% to 2%, decreased processing costs from $25 to $8 per invoice. Eliminated overtime costs saving $120K annually, improved vendor relationships with faster payments, and freed up 30 hours weekly for strategic finance work. Enhanced cash flow management with predictable processing timelines.'
    },
    tips: ['Train on various invoice formats', 'Implement validation rules', 'Use confidence scoring for routing'],
    warnings: ['Validate financial data carefully', 'Maintain audit trails', 'Have manual override capabilities'],
    tags: ['Claude API', 'Invoice Processing', 'Finance Automation', 'OCR'],
    metadata: {
      aiTool: 'Claude API',
      useCase: 'Finance Automation',
      team: 'Finance Operations',
      difficulty: 'Intermediate',
      timeToImplement: '3-4 weeks'
    },
    author: {
      name: 'Lisa Thompson',
      email: 'lthompson@amazon.com',
      contactPreference: 'email'
    },
    stats: { views: 892, likes: 71, bookmarks: 58 },
    customAiTool: {
      name: 'Invoice Parser Pro',
      description: 'Custom Claude wrapper with invoice format recognition and validation rules for multiple vendor types',
      githubUrl: 'https://github.com/amazon-internal/invoice-parser-pro',
      documentationUrl: 'https://wiki.amazon.com/invoice-automation'
    },
    promptUsed: {
      title: 'Invoice Data Extraction Prompt',
      content: 'Extract from this invoice: 1) Vendor details 2) Invoice number and date 3) Line items with amounts 4) Tax calculations 5) Payment terms. Validate totals and flag discrepancies. Format as structured JSON.',
      notes: 'Include confidence scores for each extracted field. Works best with clear, high-resolution invoice images.'
    },
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: '7',
    title: 'Solved Inventory Forecasting Errors Using Prophet',
    quickSummary: 'Fixed 40% forecasting inaccuracy causing stockouts and overstock by implementing Facebook Prophet, improving accuracy to 92%.',
    detailedSummary: {
      problem: 'Manual inventory forecasting had 40% error rates leading to frequent stockouts and $2M in excess inventory. Our supply chain team used spreadsheets and historical averages, missing seasonal patterns and demand spikes. Stockouts caused $500K monthly in lost sales, while overstock tied up working capital and increased storage costs significantly.',
      solution: 'Deployed Facebook Prophet with custom seasonality modeling and external regressor integration for demand forecasting. Built automated pipeline processing sales data, weather patterns, promotional calendars, and economic indicators. Created dashboard with confidence intervals, scenario planning, and automated reorder point calculations with safety stock optimization.',
      impact: 'Improved forecasting accuracy from 60% to 92%, reduced stockouts by 75% saving $375K monthly in lost sales, decreased excess inventory by 60% freeing up $1.2M in working capital. Optimized safety stock levels reducing carrying costs by 30%, improved customer satisfaction with 98% product availability, and enabled data-driven procurement decisions with 2-week advance planning.'
    },
    tips: ['Include external factors like weather', 'Use cross-validation for model selection', 'Monitor forecast drift regularly'],
    warnings: ['Validate against business logic', 'Account for promotional impacts', 'Have manual override capabilities'],
    tags: ['Facebook Prophet', 'Inventory Management', 'Forecasting', 'Supply Chain'],
    metadata: {
      aiTool: 'Facebook Prophet',
      useCase: 'Inventory Management',
      team: 'Supply Chain',
      difficulty: 'Advanced',
      timeToImplement: '4-6 weeks'
    },
    author: {
      name: 'Robert Chang',
      email: 'rchang@amazon.com',
      contactPreference: 'slack'
    },
    stats: { views: 1034, likes: 89, bookmarks: 76 },
    customAiTool: {
      name: 'Demand Forecast Engine',
      description: 'Prophet-based forecasting system with custom seasonality detection and external factor integration',
      githubUrl: 'https://github.com/amazon-internal/demand-forecast-engine',
      documentationUrl: 'https://wiki.amazon.com/supply-chain-forecasting'
    },
    promptUsed: {
      title: 'Forecast Analysis Prompt',
      content: 'Analyze this demand forecast: 1) Identify seasonal patterns 2) Detect anomalies or outliers 3) Assess confidence intervals 4) Recommend safety stock levels 5) Flag high-risk periods. Provide business-friendly explanations.',
      notes: 'Use with Prophet model outputs. Include historical context and external factors for better insights.'
    },
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: '8',
    title: 'Fixed Slow Hiring Process Using GPT-4 Resume Screening',
    quickSummary: 'Eliminated 2-week resume screening delays by automating initial candidate evaluation with GPT-4, reducing time-to-hire by 50%.',
    detailedSummary: {
      problem: 'Manual resume screening took 2 weeks for 200+ applications per role, creating hiring delays and candidate drop-off rates of 35%. Our HR team spent 80% of time on initial screening instead of strategic recruiting activities. Inconsistent evaluation criteria led to qualified candidates being overlooked, and hiring managers complained about slow pipeline flow.',
      solution: 'Implemented GPT-4 for automated resume screening with custom prompts matching job requirements and company culture fit. Built scoring system with weighted criteria, bias detection algorithms, and integration with ATS. Created candidate ranking dashboard with detailed explanations and automated communication for rejected candidates with personalized feedback.',
      impact: '50% reduction in time-to-hire from 6 weeks to 3 weeks, improved candidate experience with 24-hour initial response, increased qualified candidate identification by 30%. Reduced HR screening workload by 70% enabling focus on strategic recruiting, decreased candidate drop-off rates from 35% to 12%, and improved hiring manager satisfaction scores by 40%. Enhanced diversity hiring through bias-reduced screening.'
    },
    tips: ['Define clear scoring criteria', 'Include bias detection checks', 'Provide candidate feedback'],
    warnings: ['Avoid discriminatory patterns', 'Maintain human oversight', 'Comply with hiring regulations'],
    tags: ['GPT-4', 'HR Automation', 'Resume Screening', 'Talent Acquisition'],
    metadata: {
      aiTool: 'GPT-4',
      useCase: 'HR Automation',
      team: 'Human Resources',
      difficulty: 'Intermediate',
      timeToImplement: '2-3 weeks'
    },
    author: {
      name: 'Maria Gonzalez',
      email: 'mgonzalez@amazon.com',
      contactPreference: 'both'
    },
    stats: { views: 756, likes: 64, bookmarks: 49 },
    customAiTool: {
      name: 'Resume Screening Assistant',
      description: 'GPT-4 based resume evaluation system with bias detection and customizable scoring criteria',
      githubUrl: 'https://github.com/amazon-internal/resume-screening-ai',
      documentationUrl: 'https://wiki.amazon.com/hr-automation-tools'
    },
    promptUsed: {
      title: 'Resume Evaluation Prompt',
      content: 'Evaluate this resume against job requirements: 1) Technical skills match 2) Experience relevance 3) Career progression 4) Cultural fit indicators 5) Red flags or concerns. Score 1-10 with explanations. Avoid bias based on names, schools, or demographics.',
      notes: 'Include job description context. Regularly audit for bias patterns. Provide constructive feedback for rejected candidates.'
    },
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: '9',
    title: 'Eliminated Contract Review Bottlenecks Using Claude',
    quickSummary: 'Solved 5-day legal review delays by automating contract analysis with Claude, reducing review time by 75%.',
    detailedSummary: {
      problem: 'Legal contract reviews took 5 days creating business delays and frustrated stakeholders. Our legal team reviewed 100+ contracts monthly with manual clause analysis, risk assessment, and compliance checking. Business teams waited extensively for approvals, missing deal deadlines and competitive opportunities. Review quality was inconsistent across different lawyers.',
      solution: 'Deployed Claude for automated contract analysis with custom prompts for clause extraction, risk identification, and compliance checking. Built workflow system with risk scoring, automated routing based on contract value and complexity, and integration with legal management system. Created standardized review templates and automated redlining suggestions with legal precedent matching.',
      impact: '75% faster review time from 5 days to 1.25 days, improved consistency with standardized risk scoring, reduced legal team workload by 60%. Accelerated deal closure rates by 40%, decreased missed opportunities due to delays, and improved business stakeholder satisfaction scores by 50%. Enhanced contract quality through comprehensive automated checks and reduced legal risks through consistent review standards.'
    },
    tips: ['Create clause libraries for reference', 'Use risk scoring matrices', 'Maintain legal precedent database'],
    warnings: ['Require lawyer final approval', 'Keep sensitive clauses manual', 'Maintain compliance standards'],
    tags: ['Claude API', 'Legal Tech', 'Contract Analysis', 'Risk Management'],
    metadata: {
      aiTool: 'Claude API',
      useCase: 'Legal Automation',
      team: 'Legal Operations',
      difficulty: 'Advanced',
      timeToImplement: '4-5 weeks'
    },
    author: {
      name: 'James Wilson',
      email: 'jwilson@amazon.com',
      contactPreference: 'email'
    },
    stats: { views: 923, likes: 78, bookmarks: 61 },
    customAiTool: {
      name: 'Contract Analysis Suite',
      description: 'Claude-powered contract review system with legal clause library and risk assessment framework',
      githubUrl: 'https://github.com/amazon-internal/contract-analysis-suite',
      documentationUrl: 'https://wiki.amazon.com/legal-automation'
    },
    promptUsed: {
      title: 'Contract Review Prompt',
      content: 'Analyze this contract for: 1) Key terms and obligations 2) Risk factors and liability clauses 3) Compliance with standard terms 4) Missing or problematic clauses 5) Negotiation recommendations. Categorize risks as low/medium/high with explanations.',
      notes: 'Include contract type context and company standard terms. Flag unusual clauses for human review. Maintain confidentiality of sensitive terms.'
    },
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  },
  {
    id: '10',
    title: 'Fixed Expense Report Delays Using OCR and GPT-4',
    quickSummary: 'Eliminated 4-day expense processing delays by automating receipt scanning and categorization, achieving 90% accuracy.',
    detailedSummary: {
      problem: 'Manual expense report processing took 4 days with frequent errors and compliance issues. Employees submitted 2000+ expense reports monthly requiring manual receipt review, categorization, and policy compliance checking. Finance team spent 40 hours weekly on processing, and reimbursement delays frustrated employees causing productivity impacts.',
      solution: 'Implemented OCR with GPT-4 for automated receipt scanning, data extraction, and expense categorization. Built mobile app for instant receipt capture with real-time policy validation, automated approval routing, and integration with accounting system. Created smart categorization based on merchant patterns and policy compliance checking with exception handling.',
      impact: '90% processing time reduction from 4 days to 4 hours, improved accuracy from 75% to 95%, reduced finance team workload by 80%. Enhanced employee satisfaction with same-day reimbursements, decreased policy violations by 60% through real-time validation, and improved compliance reporting accuracy. Generated $200K annual savings through automation and reduced processing errors.'
    },
    tips: ['Train on receipt formats', 'Implement policy validation rules', 'Use confidence scoring for routing'],
    warnings: ['Validate tax implications', 'Maintain audit trails', 'Check policy compliance'],
    tags: ['OCR', 'GPT-4', 'Expense Management', 'Finance Automation'],
    metadata: {
      aiTool: 'GPT-4 + OCR',
      useCase: 'Expense Management',
      team: 'Finance Operations',
      difficulty: 'Intermediate',
      timeToImplement: '3-4 weeks'
    },
    author: {
      name: 'Amanda Foster',
      email: 'afoster@amazon.com',
      contactPreference: 'slack'
    },
    stats: { views: 687, likes: 55, bookmarks: 42 },
    customAiTool: {
      name: 'Expense Processing Bot',
      description: 'OCR and GPT-4 powered expense report automation with policy validation and mobile receipt capture',
      githubUrl: 'https://github.com/amazon-internal/expense-processing-bot',
      documentationUrl: 'https://wiki.amazon.com/expense-automation'
    },
    promptUsed: {
      title: 'Receipt Analysis Prompt',
      content: 'Extract from this receipt: 1) Merchant name and category 2) Date and amount 3) Tax details 4) Expense category per company policy 5) Policy compliance check. Flag any violations or unusual patterns. Format as structured data.',
      notes: 'Include company expense policy context. Handle multiple currencies and tax rates. Provide confidence scores for extracted data.'
    },
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  }
]

// Ranking algorithm: 40% views + 30% recency + 30% engagement
export const getRankedLessons = (lessons: Lesson[], limit?: number): Lesson[] => {
  const now = new Date()
  
  const rankedLessons = lessons.map(lesson => {
    const createdDate = new Date(lesson.createdAt)
    const daysSinceCreated = Math.max(1, (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    
    // Normalize scores (0-1)
    const maxViews = Math.max(...lessons.map(l => l.stats.views))
    const viewScore = lesson.stats.views / maxViews
    
    const recencyScore = Math.max(0, 1 - (daysSinceCreated / 30)) // Decay over 30 days
    
    const engagementRate = (lesson.stats.likes + lesson.stats.bookmarks) / Math.max(1, lesson.stats.views)
    const maxEngagement = Math.max(...lessons.map(l => (l.stats.likes + l.stats.bookmarks) / Math.max(1, l.stats.views)))
    const engagementScore = engagementRate / maxEngagement
    
    const totalScore = (viewScore * 0.4) + (recencyScore * 0.3) + (engagementScore * 0.3)
    
    return { ...lesson, score: totalScore }
  })
  
  const sorted = rankedLessons.sort((a, b) => b.score - a.score)
  return limit ? sorted.slice(0, limit) : sorted
}