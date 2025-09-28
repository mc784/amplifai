import React from 'react';

interface LoadingStatesProps {
  stage: 'uploading' | 'extracting' | 'generating' | 'finalizing' | 'complete';
  progress: number;
  fileName?: string;
  estimatedTime?: number;
}

export default function LoadingStates({ stage, progress, fileName, estimatedTime }: LoadingStatesProps) {
  const getStageInfo = () => {
    switch (stage) {
      case 'uploading':
        return {
          title: 'Uploading File',
          description: `Uploading ${fileName || 'your file'}...`,
          icon: '📤'
        };
      case 'extracting':
        return {
          title: 'Extracting Content',
          description: 'Analyzing and extracting text from your document...',
          icon: '🔍'
        };
      case 'generating':
        return {
          title: 'Generating Lesson',
          description: 'AI is creating your lesson learned from the content...',
          icon: '🤖'
        };
      case 'finalizing':
        return {
          title: 'Finalizing',
          description: 'Adding final touches and formatting...',
          icon: '✨'
        };
      case 'complete':
        return {
          title: 'Complete',
          description: 'Your lesson has been generated successfully!',
          icon: '✅'
        };
    }
  };

  const stageInfo = getStageInfo();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{stageInfo.icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{stageInfo.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{stageInfo.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Estimated Time */}
      {estimatedTime && estimatedTime > 0 && (
        <div className="text-center text-xs text-gray-500">
          Estimated time remaining: {Math.ceil(estimatedTime / 1000)}s
        </div>
      )}

      {/* Animated Dots */}
      <div className="flex justify-center mt-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}