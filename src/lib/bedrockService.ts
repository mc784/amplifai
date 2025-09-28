import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"

// Use default credential chain - will pick up corporate credentials automatically
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1'
  // No explicit credentials - uses AWS credential chain (corporate SSO, profiles, etc.)
})

export async function generateLessonFromContent(content: string) {
  const prompt = `Analyze the following content and structure it into a lessons learned format. Provide:
1. An 8-10 word title that captures the essence of the scenario
2. A concise summary (50-80 words) encompassing the challenge, solution, and impact
3. A detailed breakdown (100 words each) under these headings:
   - THE CHALLENGE: Identify the key problems, pain points, and root causes
   - OUR SOLUTION: Describe the implemented solution and approach taken
   - IMPACT & RESULTS: Detail the measurable outcomes and benefits realized
   - TIPS & WARNINGS: Highlight the dos and don'ts for lesson users

Content to analyze: ${content.substring(0, 3000)}

Format as JSON with these exact fields:
- title: 8-10 word title capturing the essence
- quickSummary: 50-80 word summary
- problem: 100 words on key problems and root causes
- solution: 100 words on implemented solution and approach
- impact: 100 words on measurable outcomes and benefits
- tipsWarnings: Dos and don'ts for users
- tags: Array of 3-5 relevant tags
- difficulty: "Beginner", "Intermediate", or "Advanced"
- timeToImplement: Estimated time needed`

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-haiku-20240307-v1:0",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  })

  const response = await client.send(command)
  const responseBody = JSON.parse(new TextDecoder().decode(response.body))
  
  return JSON.parse(responseBody.content[0].text)
}

export async function generateTagsFromContent(content: string) {
  const prompt = `Generate 5-7 educational tags for this content: ${content.substring(0, 1000)}`
  
  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-haiku-20240307-v1:0",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }]
    })
  })

  const response = await client.send(command)
  const responseBody = JSON.parse(new TextDecoder().decode(response.body))
  
  return responseBody.content[0].text.split(',').map((tag: string) => tag.trim())
}