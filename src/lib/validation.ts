/**
 * Input validation utilities following ISO/IEC 25010 reliability standards
 */

import { VALIDATION_PATTERNS, UI_CONSTANTS } from './constants'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Validates lesson data input
 */
export function validateLessonData(data: {
  title?: string
  summary?: string
  tags?: string[]
}): ValidationResult {
  const errors: string[] = []

  // Title validation
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required')
  } else if (data.title.length > UI_CONSTANTS.MAX_LESSON_TITLE_LENGTH) {
    errors.push(`Title must be less than ${UI_CONSTANTS.MAX_LESSON_TITLE_LENGTH} characters`)
  }

  // Summary validation
  if (data.summary && data.summary.length > UI_CONSTANTS.MAX_SUMMARY_LENGTH) {
    errors.push(`Summary must be less than ${UI_CONSTANTS.MAX_SUMMARY_LENGTH} characters`)
  }

  // Tags validation
  if (data.tags && data.tags.length > UI_CONSTANTS.MAX_TAGS_PER_LESSON) {
    errors.push(`Maximum ${UI_CONSTANTS.MAX_TAGS_PER_LESSON} tags allowed`)
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []

  if (!email || email.trim().length === 0) {
    errors.push('Email is required')
  } else if (!VALIDATION_PATTERNS.EMAIL.test(email)) {
    errors.push('Invalid email format')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validates Amazon email format
 */
export function validateAmazonEmail(email: string): ValidationResult {
  const errors: string[] = []

  if (!email || email.trim().length === 0) {
    errors.push('Email is required')
  } else if (!VALIDATION_PATTERNS.AMAZON_EMAIL.test(email)) {
    errors.push('Must be a valid Amazon email address')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
}

/**
 * Validates file upload
 */
export function validateFileUpload(file: File): ValidationResult {
  const errors: string[] = []

  if (!file) {
    errors.push('File is required')
    return { isValid: false, errors }
  }

  // File size validation is handled in fileProcessor.ts
  // This is for additional client-side validation

  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
  ]

  if (!allowedTypes.includes(file.type)) {
    errors.push('File type not supported. Please use PDF, Word, or text files.')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}