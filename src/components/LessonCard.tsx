import { Lesson } from '@/types'
import { Eye, Heart, Bookmark, Clock } from 'lucide-react'
import Link from 'next/link'

interface LessonCardProps {
  lesson: Lesson
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link href={`/lessons/${lesson.id}`}>
      <div className="card hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-amazon-blue line-clamp-2">
            {lesson.title}
          </h3>
          <span className="text-xs bg-amazon-orange text-white px-2 py-1 rounded-full">
            {lesson.metadata.difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {lesson.quickSummary}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {lesson.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
          {lesson.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{lesson.tags.length - 3} more</span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{lesson.stats.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{lesson.stats.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bookmark className="w-3 h-3" />
              <span>{lesson.stats.bookmarks}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{lesson.metadata.timeToImplement}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}