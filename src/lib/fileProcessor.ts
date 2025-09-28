import * as mammoth from 'mammoth'
import { logger } from './logger'
import { PERFORMANCE_LIMITS, SUPPORTED_FILE_TYPES, ERROR_MESSAGES } from './constants'

/**
 * Extracts text content from uploaded files
 * Follows ISO/IEC 25010 reliability and performance standards
 */
export async function extractTextFromFile(file: File): Promise<string> {
  // Validate file size (Performance Efficiency)
  if (file.size > PERFORMANCE_LIMITS.MAX_FILE_SIZE) {
    logger.warn('File size exceeds limit', { fileName: file.name, size: file.size })
    throw new Error(ERROR_MESSAGES.FILE_TOO_LARGE)
  }

  const fileType = file.type.toLowerCase()
  const fileName = file.name.toLowerCase()

  logger.info('Processing file', { fileName: file.name, fileType, size: file.size })

  try {
    if (isFileTypeSupported(fileType, fileName, SUPPORTED_FILE_TYPES.PDF)) {
      return await extractFromPDF(file)
    } else if (isFileTypeSupported(fileType, fileName, SUPPORTED_FILE_TYPES.WORD)) {
      return await extractFromWord(file)
    } else if (fileType.includes('sheet') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      logger.warn('Excel file upload attempted', { fileName: file.name })
      throw new Error('Excel files are temporarily disabled for security reasons. Please convert to PDF or Word format.')
    } else if (isFileTypeSupported(fileType, fileName, SUPPORTED_FILE_TYPES.POWERPOINT)) {
      return await extractFromPowerPoint(file)
    } else if (isFileTypeSupported(fileType, fileName, SUPPORTED_FILE_TYPES.TEXT)) {
      return await file.text()
    } else {
      logger.warn('Unsupported file type', { fileName: file.name, fileType })
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE)
    }
  } catch (error) {
    logger.error('File processing failed', { fileName: file.name }, error as Error)
    throw new Error(`Failed to process ${file.name}. Please ensure it's a valid document.`)
  }
}

/**
 * Checks if file type is supported
 */
function isFileTypeSupported(fileType: string, fileName: string, supportedTypes: string[]): boolean {
  return supportedTypes.some(type => 
    type.startsWith('.') ? fileName.endsWith(type) : fileType.includes(type.split('/')[1])
  )
}

async function extractFromPDF(file: File): Promise<string> {
  try {
    logger.debug('Extracting text from PDF', { fileName: file.name })
    // Dynamic import to avoid build-time issues
    const pdfParse = (await import('pdf-parse')).default
    const arrayBuffer = await file.arrayBuffer()
    const data = await pdfParse(Buffer.from(arrayBuffer))
    
    logger.info('PDF extraction successful', { 
      fileName: file.name, 
      textLength: data.text.length,
      pages: data.numpages 
    })
    
    return data.text
  } catch (error) {
    logger.error('PDF parsing failed', { fileName: file.name }, error as Error)
    throw new Error('Failed to parse PDF file')
  }
}

async function extractFromWord(file: File): Promise<string> {
  try {
    logger.debug('Extracting text from Word document', { fileName: file.name })
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    
    logger.info('Word extraction successful', { 
      fileName: file.name, 
      textLength: result.value.length 
    })
    
    return result.value
  } catch (error) {
    logger.error('Word document parsing failed', { fileName: file.name }, error as Error)
    throw new Error('Failed to parse Word document')
  }
}

// Excel processing temporarily disabled due to security vulnerability in xlsx package
// Users should convert Excel files to PDF or Word format

async function extractFromPowerPoint(file: File): Promise<string> {
  try {
    logger.debug('Extracting text from PowerPoint', { fileName: file.name })
    // For PowerPoint, we'll extract basic text content
    // This is a simplified implementation - in production you might want a more robust solution
    const arrayBuffer = await file.arrayBuffer()
    const text = new TextDecoder().decode(arrayBuffer)
    
    // Extract readable text using regex patterns
    const textMatches = text.match(/[a-zA-Z0-9\s.,!?;:'"()-]{10,}/g)
    const extractedText = textMatches ? textMatches.join(' ').substring(0, 5000) : 'PowerPoint content extracted'
    
    logger.info('PowerPoint extraction completed', { 
      fileName: file.name, 
      textLength: extractedText.length 
    })
    
    return extractedText
  } catch (error) {
    logger.error('PowerPoint parsing failed', { fileName: file.name }, error as Error)
    throw new Error('Failed to parse PowerPoint file')
  }
}

export async function processMultipleFiles(files: File[]): Promise<string> {
  // Validate file count (Performance Efficiency)
  if (files.length > PERFORMANCE_LIMITS.MAX_FILES_PER_UPLOAD) {
    logger.warn('Too many files uploaded', { fileCount: files.length })
    throw new Error(`Maximum ${PERFORMANCE_LIMITS.MAX_FILES_PER_UPLOAD} files allowed per upload`)
  }

  logger.info('Processing multiple files', { fileCount: files.length })

  const extractedTexts = await Promise.all(
    files.map(async file => {
      try {
        const text = await extractTextFromFile(file)
        return `=== ${file.name} ===\n${text}\n\n`
      } catch (error) {
        logger.warn('File processing failed in batch', { fileName: file.name, error: (error as Error).message })
        return `=== ${file.name} (Error) ===\nFailed to process this file.\n\n`
      }
    })
  )

  const combinedText = extractedTexts.join('')
  logger.info('Multiple file processing completed', { 
    fileCount: files.length, 
    totalTextLength: combinedText.length 
  })

  return combinedText
}