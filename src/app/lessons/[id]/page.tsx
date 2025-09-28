import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Eye, Heart, Bookmark, User, Calendar, Tag, CheckCircle, AlertTriangle, Target, Lightbulb, TrendingUp, Code, Bot } from 'lucide-react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getLesson(id: string) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id }
    })
    return lesson
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return null
  }
}

export default async function LessonDetailPage({ params }: { params: { id: string } }) {
  const lesson = await getLesson(params.id)
  
  if (!lesson) {
    notFound()
  }

  let lessonData
  try {
    lessonData = JSON.parse(lesson.lessonJson)
  } catch (error) {
    lessonData = {
      title: lesson.title,
      quickSummary: 'Unable to load lesson content',
      detailedSummary: {
        problem: 'Data parsing error',
        solution: 'Please contact support',
        impact: 'Unable to display'
      },
      tags: [],
      metadata: {},
      author: { name: 'Unknown', email: '' },
      stats: { views: 0, likes: 0, bookmarks: 0 }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <p className="text-blue-900 font-medium text-lg leading-relaxed">{lessonData.quickSummary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium">{lessonData.stats?.views || 0}</span> views
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-400" />
              <span className="font-medium">{lessonData.stats?.likes || 0}</span> likes
            </div>
            <div className="flex items-center">
              <Bookmark className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="font-medium">{lessonData.stats?.bookmarks || 0}</span> saved
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              {new Date(lesson.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {lessonData.tags && lessonData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {lessonData.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* THE CHALLENGE */}
            {lessonData.detailedSummary?.problem && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                  <h2 className="text-2xl font-bold text-red-900 flex items-center">
                    <Target className="w-6 h-6 mr-3 text-red-600" />
                    THE CHALLENGE
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed text-lg">{lessonData.detailedSummary.problem}</p>
                </div>
              </div>
            )}

            {/* OUR SOLUTION */}
            {lessonData.detailedSummary?.solution && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                  <h2 className="text-2xl font-bold text-blue-900 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-3 text-blue-600" />
                    OUR SOLUTION
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed text-lg">{lessonData.detailedSummary.solution}</p>
                </div>
              </div>
            )}

            {/* IMPACT & RESULTS */}
            {lessonData.detailedSummary?.impact && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                  <h2 className="text-2xl font-bold text-green-900 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
                    IMPACT & RESULTS
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed text-lg">{lessonData.detailedSummary.impact}</p>
                </div>
              </div>
            )}

            {/* TIPS & WARNINGS */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100">
                <h2 className="text-2xl font-bold text-yellow-900 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
                  TIPS & WARNINGS
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lessonData.tips && Array.isArray(lessonData.tips) && lessonData.tips.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        Best Practices
                      </h3>
                      <ul className="space-y-3">
                        {lessonData.tips.map((tip: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                            <span className="leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lessonData.warnings && Array.isArray(lessonData.warnings) && lessonData.warnings.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                        Important Warnings
                      </h3>
                      <ul className="space-y-3">
                        {lessonData.warnings.map((warning: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-red-500 mr-3 mt-1 text-lg">⚠</span>
                            <span className="leading-relaxed">{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PROMPT USED - Only show if available */}
            {lessonData.promptUsed && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
                  <h2 className="text-2xl font-bold text-purple-900 flex items-center">
                    <Code className="w-6 h-6 mr-3 text-purple-600" />
                    PROMPT USED
                  </h2>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">{lessonData.promptUsed.title}</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                      {lessonData.promptUsed.content}
                    </pre>
                  </div>
                  {lessonData.promptUsed.notes && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 leading-relaxed">
                        <strong>Implementation Notes:</strong> {lessonData.promptUsed.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CUSTOM AI SOLUTION - Only show if available */}
            {lessonData.customAiTool && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                  <h2 className="text-2xl font-bold text-indigo-900 flex items-center">
                    <Bot className="w-6 h-6 mr-3 text-indigo-600" />
                    CUSTOM AI SOLUTION
                  </h2>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">{lessonData.customAiTool.name}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">{lessonData.customAiTool.description}</p>
                  
                  {lessonData.customAiTool.features && Array.isArray(lessonData.customAiTool.features) && lessonData.customAiTool.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {lessonData.customAiTool.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <span className="text-indigo-500 mr-3 mt-1">•</span>
                            <span className="text-gray-700 leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {lessonData.customAiTool.implementation && (
                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200 mb-4">
                      <h4 className="font-semibold text-indigo-900 mb-2">Implementation Details:</h4>
                      <p className="text-indigo-800 leading-relaxed">{lessonData.customAiTool.implementation}</p>
                    </div>
                  )}

                  {(lessonData.customAiTool.githubUrl || lessonData.customAiTool.documentationUrl) && (
                    <div className="flex flex-wrap gap-3">
                      {lessonData.customAiTool.githubUrl && (
                        <a 
                          href={lessonData.customAiTool.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <Code className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      )}
                      {lessonData.customAiTool.documentationUrl && (
                        <a 
                          href={lessonData.customAiTool.documentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Bookmark className="w-4 h-4 mr-2" />
                          Documentation
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            {lessonData.author && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Author</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{lessonData.author.name}</p>
                    <p className="text-sm text-gray-600">{lessonData.author.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson Details */}
            {lessonData.metadata && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Details</h3>
                <div className="space-y-4">
                  {lessonData.metadata.aiTool && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 block mb-1">AI Tool Used:</span>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {lessonData.metadata.aiTool}
                      </span>
                    </div>
                  )}
                  {lessonData.metadata.difficulty && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 block mb-1">Difficulty Level:</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        lessonData.metadata.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        lessonData.metadata.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lessonData.metadata.difficulty}
                      </span>
                    </div>
                  )}
                  {lessonData.metadata.timeToImplement && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 block mb-1">Implementation Time:</span>
                      <p className="text-sm text-gray-900 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {lessonData.metadata.timeToImplement}
                      </p>
                    </div>
                  )}
                  {lessonData.metadata.useCase && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 block mb-1">Use Case:</span>
                      <p className="text-sm text-gray-900">{lessonData.metadata.useCase}</p>
                    </div>
                  )}
                  {lessonData.metadata.team && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 block mb-1">Team:</span>
                      <p className="text-sm text-gray-900">{lessonData.metadata.team}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Heart className="w-4 h-4 mr-2" />
                  Like This Lesson
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}