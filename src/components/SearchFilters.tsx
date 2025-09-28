import React from 'react';
import { Search, Filter, X, Tag, Clock, TrendingUp, Users } from 'lucide-react';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  selectedDifficulty: string[];
  onDifficultyToggle: (difficulty: string) => void;
  selectedTimeRange: string[];
  onTimeRangeToggle: (timeRange: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  availableTags: string[];
  onClearFilters: () => void;
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
  selectedDifficulty,
  onDifficultyToggle,
  selectedTimeRange,
  onTimeRangeToggle,
  sortBy,
  onSortChange,
  availableTags,
  onClearFilters
}: SearchFiltersProps) {
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const timeRanges = ['< 1 hour', '1-2 hours', '2-4 hours', '4+ hours'];
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'newest', label: 'Newest First', icon: <Clock className="w-4 h-4" /> },
    { value: 'popular', label: 'Most Popular', icon: <Users className="w-4 h-4" /> },
    { value: 'impact', label: 'Highest Impact', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const hasActiveFilters = selectedTags.length > 0 || selectedDifficulty.length > 0 || selectedTimeRange.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search lessons by title, content, or technology..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange"
        />
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === option.value
                ? 'bg-amazon-orange text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Tags Filter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Technologies & Topics</span>
            </div>
            {selectedTags.length > 0 && (
              <span className="text-xs bg-amazon-orange text-white px-2 py-1 rounded-full">
                {selectedTags.length} selected
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.slice(0, 12).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-amazon-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Difficulty Level</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => onDifficultyToggle(difficulty)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedDifficulty.includes(difficulty)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Time Range Filter */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Implementation Time</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((timeRange) => (
              <button
                key={timeRange}
                onClick={() => onTimeRangeToggle(timeRange)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTimeRange.includes(timeRange)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timeRange}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear all filters</span>
          </button>
        </div>
      )}
    </div>
  );
}