export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

export const SUPPORTED_FILE_TYPES = {
  'application/pdf': { ext: '.pdf', maxSize: 50 * 1024 * 1024 }, // 50MB
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { ext: '.docx', maxSize: 50 * 1024 * 1024 },
  'application/msword': { ext: '.doc', maxSize: 50 * 1024 * 1024 },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { ext: '.xlsx', maxSize: 50 * 1024 * 1024 },
  'application/vnd.ms-excel': { ext: '.xls', maxSize: 50 * 1024 * 1024 },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { ext: '.pptx', maxSize: 50 * 1024 * 1024 },
  'application/vnd.ms-powerpoint': { ext: '.ppt', maxSize: 50 * 1024 * 1024 },
  'text/plain': { ext: '.txt', maxSize: 10 * 1024 * 1024 }, // 10MB for text files
  'text/markdown': { ext: '.md', maxSize: 10 * 1024 * 1024 },
};

export const MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200MB total

export function validateFile(file: File): FileValidationResult {
  const warnings: string[] = [];

  // Check file type
  if (!SUPPORTED_FILE_TYPES[file.type as keyof typeof SUPPORTED_FILE_TYPES]) {
    return {
      isValid: false,
      error: `Unsupported file type: ${file.type}. Supported types: PDF, Word, Excel, PowerPoint, Text, Markdown.`
    };
  }

  // Check individual file size
  const maxSize = SUPPORTED_FILE_TYPES[file.type as keyof typeof SUPPORTED_FILE_TYPES].maxSize;
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size (${formatFileSize(file.size)}) exceeds maximum allowed size (${formatFileSize(maxSize)}).`
    };
  }

  // Add warnings for large files
  if (file.size > 10 * 1024 * 1024) { // 10MB
    warnings.push('Large file detected. Processing may take longer.');
  }

  return {
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

export function validateFiles(files: File[]): FileValidationResult {
  const warnings: string[] = [];

  // Check total size
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_SIZE) {
    return {
      isValid: false,
      error: `Total file size (${formatFileSize(totalSize)}) exceeds maximum allowed (${formatFileSize(MAX_TOTAL_SIZE)}).`
    };
  }

  // Validate each file
  for (const file of files) {
    const result = validateFile(file);
    if (!result.isValid) {
      return result;
    }
    if (result.warnings) {
      warnings.push(...result.warnings);
    }
  }

  return {
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIcon(fileType: string): string {
  switch (fileType) {
    case 'application/pdf':
      return '📄';
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/msword':
      return '📝';
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.ms-excel':
      return '📊';
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/vnd.ms-powerpoint':
      return '📋';
    case 'text/plain':
    case 'text/markdown':
      return '📃';
    default:
      return '📁';
  }
}