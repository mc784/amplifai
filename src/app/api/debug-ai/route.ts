import { NextResponse } from 'next/server'

export async function GET() {
  const config = {
    servicePriority: process.env.AI_SERVICE_PRIORITY || 'bedrock',
    hasClaudeKey: !!(process.env.ANTHROPIC_API_KEY && 
                     process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here' &&
                     process.env.ANTHROPIC_API_KEY.startsWith('sk-ant-')),
    awsRegion: process.env.AWS_REGION,
    aiModel: process.env.AI_MODEL
  }
  
  return NextResponse.json(config)
}