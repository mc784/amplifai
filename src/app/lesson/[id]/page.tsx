'use client';

import { useParams } from 'next/navigation';
import { mockLessons } from '@/lib/mockData';
import { ArrowLeft, Calendar, Eye, ThumbsUp, MessageSquare, User, Building, Tag, Code, FileText, ExternalLink, Copy } from 'lucide-react';
import Link from 'next/link';

export default function LessonPage() {
  const params = useParams();
  const lesson = mockLessons.find(l => l.id === params.id);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href="/" className="text-orange-600 hover:text-orange-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </Link>

        {/* Lesson Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          
          {/* Quick Summary */}
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
            <h2 className="font-semibold text-orange-800 mb-2">Quick Summary</h2>
            <p className="text-orange-700">{lesson.quickSummary}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {lesson.stats.views} views
            </div>
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {lesson.stats.likes} likes
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {lesson.stats.bookmarks} bookmarks
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(lesson.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {lesson.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
            <p className="text-gray-700 mb-6">{lesson.detailedSummary.problem}</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <p className="text-gray-700 mb-6">{lesson.detailedSummary.solution}</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact & Results</h2>
            <p className="text-gray-700 mb-6">{lesson.detailedSummary.impact}</p>

            {/* Tips & Warnings */}
            {lesson.tips && lesson.tips.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips & Warnings</h2>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  {lesson.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Custom AI Tool */}
        {lesson.customAiTool && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-center mb-4">
              <Code className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Custom AI Tool</h2>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">{lesson.customAiTool.name}</h3>
              <p className="text-blue-800 mb-4">{lesson.customAiTool.description}</p>
              <div className="flex space-x-4">
                {lesson.customAiTool.githubUrl && (
                  <a href={lesson.customAiTool.githubUrl} className="inline-flex items-center text-blue-600 hover:text-blue-700">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    GitHub
                  </a>
                )}
                {lesson.customAiTool.documentationUrl && (
                  <a href={lesson.customAiTool.documentationUrl} className="inline-flex items-center text-blue-600 hover:text-blue-700">
                    <FileText className="w-4 h-4 mr-1" />
                    Documentation
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Prompt Used */}
        {lesson.promptUsed && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Prompt Used</h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-green-900">{lesson.promptUsed.title}</h3>
                <button 
                  onClick={() => copyToClipboard(lesson.promptUsed!.content)}
                  className="inline-flex items-center text-green-600 hover:text-green-700 text-sm"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </button>
              </div>
              <div className="bg-white border border-green-200 rounded p-3 mb-3">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">{lesson.promptUsed.content}</pre>
              </div>
              {lesson.promptUsed.notes && (
                <p className="text-green-700 text-sm italic">{lesson.promptUsed.notes}</p>
              )}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lesson Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Shared by:</span>
              </div>
              <p className="text-gray-700 ml-6">{lesson.author.name}</p>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Building className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Team:</span>
              </div>
              <p className="text-gray-700 ml-6">{lesson.metadata.team}</p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <span className="font-medium">AI Tool Used:</span>
              </div>
              <p className="text-gray-700">{lesson.metadata.aiTool}</p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <span className="font-medium">Use Case:</span>
              </div>
              <p className="text-gray-700">{lesson.metadata.useCase}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}