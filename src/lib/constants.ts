/**
 * Application constants following ISO/IEC 25000 maintainability standards
 */

// Performance thresholds (ISO/IEC 25010 - Performance Efficiency)
export const PERFORMANCE_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_PER_UPLOAD: 5,
  DATABASE_QUERY_TIMEOUT: 30000, // 30 seconds
  API_RESPONSE_TIMEOUT: 15000, // 15 seconds
} as const

// UI/UX constants (ISO/IEC 25010 - Usability)
export const UI_CONSTANTS = {
  MAX_LESSON_TITLE_LENGTH: 100,
  MAX_SUMMARY_LENGTH: 500,
  MAX_TAGS_PER_LESSON: 10,
  PAGINATION_SIZE: 12,
  SEARCH_DEBOUNCE_MS: 300,
} as const

// Error messages (ISO/IEC 25010 - Usability)
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File size exceeds 10MB limit',
  UNSUPPORTED_FILE_TYPE: 'File type not supported',
  NETWORK_ERROR: 'Network connection failed. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again',
  GENERIC_ERROR: 'Something went wrong. Please try again later.',
} as const

// Validation patterns (ISO/IEC 25010 - Reliability)
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  AMAZON_EMAIL: /^[^\s@]+@amazon\.(com|co\.uk|de|fr|it|es|ca|com\.au|co\.jp)$/,
  LESSON_ID: /^[a-zA-Z0-9_-]+$/,
} as const

// Supported file types (ISO/IEC 25010 - Compatibility)
export const SUPPORTED_FILE_TYPES = {
  PDF: ['application/pdf', '.pdf'] as string[],
  WORD: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    '.docx',
    '.doc',
  ] as string[],
  TEXT: ['text/plain', '.txt'] as string[],
  POWERPOINT: [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
    '.pptx',
    '.ppt',
  ] as string[],
}

// AI service configuration (ISO/IEC 25010 - Reliability)
export const AI_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,
  MAX_TOKENS: 4000,
  TEMPERATURE: 0.7,
  DEFAULT_MODEL: 'anthropic.claude-3-haiku-20240307-v1:0',
} as const

// Database configuration (ISO/IEC 25010 - Reliability)
export const DATABASE_CONFIG = {
  CONNECTION_TIMEOUT: 10000,
  QUERY_TIMEOUT: 30000,
  MAX_CONNECTIONS: 10,
} as const