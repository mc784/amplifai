import * as pdfParse from 'pdf-parse'
import * as mammoth from 'mammoth'
import * as XLSX from 'xlsx'

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type.toLowerCase()
  const fileName = file.name.toLowerCase()

  try {
    if (fileType.includes('pdf') || fileName.endsWith('.pdf')) {
      return await extractFromPDF(file)
    } else if (fileType.includes('word') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return await extractFromWord(file)
    } else if (fileType.includes('sheet') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      return await extractFromExcel(file)
    } else if (fileType.includes('presentation') || fileName.endsWith('.pptx') || fileName.endsWith('.ppt')) {
      return await extractFromPowerPoint(file)
    } else if (fileType.includes('text') || fileName.endsWith('.txt')) {
      return await file.text()
    } else {
      throw new Error(`Unsupported file type: ${fileType}`)
    }
  } catch (error) {
    console.error(`Error processing ${file.name}:`, error)
    throw new Error(`Failed to process ${file.name}. Please ensure it's a valid document.`)
  }
}

async function extractFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const data = await pdfParse(Buffer.from(arrayBuffer))
  return data.text
}

async function extractFromWord(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value
}

async function extractFromExcel(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })
  
  let text = ''
  workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName]
    const sheetText = XLSX.utils.sheet_to_txt(worksheet)
    text += `Sheet: ${sheetName}\n${sheetText}\n\n`
  })
  
  return text
}

async function extractFromPowerPoint(file: File): Promise<string> {
  // For PowerPoint, we'll extract basic text content
  // This is a simplified implementation - in production you might want a more robust solution
  const arrayBuffer = await file.arrayBuffer()
  const text = new TextDecoder().decode(arrayBuffer)
  
  // Extract readable text using regex patterns
  const textMatches = text.match(/[a-zA-Z0-9\s.,!?;:'"()-]{10,}/g)
  return textMatches ? textMatches.join(' ').substring(0, 5000) : 'PowerPoint content extracted'
}

export async function processMultipleFiles(files: File[]): Promise<string> {
  const extractedTexts = await Promise.all(
    files.map(async (file) => {
      try {
        const text = await extractTextFromFile(file)
        return `=== ${file.name} ===\n${text}\n\n`
      } catch (error) {
        return `=== ${file.name} (Error) ===\nFailed to process this file.\n\n`
      }
    })
  )

  return extractedTexts.join('')
}