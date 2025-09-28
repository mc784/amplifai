import React from 'react';

interface ErrorHandlerProps {
  error: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  retryCount?: number;
  maxRetries?: number;
}

export default function ErrorHandler({ 
  error, 
  onRetry, 
  onDismiss, 
  retryCount = 0, 
  maxRetries = 3 
}: ErrorHandlerProps) {
  const getErrorType = (errorMessage: string) => {
    if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
      return 'auth';
    }
    if (errorMessage.includes('file size') || errorMessage.includes('too large')) {
      return 'fileSize';
    }
    if (errorMessage.includes('network') || errorMessage.includes('timeout')) {
      return 'network';
    }
    if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
      return 'rateLimit';
    }
    return 'general';
  };

  const getErrorInfo = (type: string) => {
    switch (type) {
      case 'auth':
        return {
          icon: '🔐',
          title: 'Authentication Error',
          suggestion: 'Please check your API key configuration in the environment settings.'
        };
      case 'fileSize':
        return {
          icon: '📁',
          title: 'File Size Error',
          suggestion: 'Please try with a smaller file (under 50MB per file, 200MB total).'
        };
      case 'network':
        return {
          icon: '🌐',
          title: 'Network Error',
          suggestion: 'Please check your internet connection and try again.'
        };
      case 'rateLimit':
        return {
          icon: '⏱️',
          title: 'Rate Limit Exceeded',
          suggestion: 'Please wait a moment before trying again.'
        };
      default:
        return {
          icon: '⚠️',
          title: 'Processing Error',
          suggestion: 'An unexpected error occurred. Please try again.'
        };
    }
  };

  const errorType = getErrorType(error);
  const errorInfo = getErrorInfo(errorType);
  const canRetry = onRetry && retryCount < maxRetries;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{errorInfo.icon}</div>
        <h3 className="text-lg font-semibold text-red-800">{errorInfo.title}</h3>
        <p className="text-sm text-red-600 mt-2">{error}</p>
        <p className="text-sm text-gray-600 mt-2">{errorInfo.suggestion}</p>
      </div>

      {retryCount > 0 && (
        <div className="text-center text-xs text-gray-500 mb-4">
          Retry attempt {retryCount} of {maxRetries}
        </div>
      )}

      <div className="flex justify-center space-x-3">
        {canRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}