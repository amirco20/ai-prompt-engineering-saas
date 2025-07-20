import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI prompt engineer. Analyze user prompts and provide specific suggestions for improvement. Always include a numerical effectiveness score out of 100 and actionable recommendations.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0].message.content
    
    const scoreMatch = aiResponse?.match(/(\d+)\/100/) || ['', '75']
    const score = parseInt(scoreMatch[1]) || 75

    res.status(200).json({
      response: aiResponse,
      score: score
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({ error: 'Failed to get AI response' })
  }
}