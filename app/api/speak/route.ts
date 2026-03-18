import { groq } from '@/lib/groq'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  const response = await groq.audio.speech.create({
    model: 'canopylabs/orpheus-v1-english',
    voice: 'luna',
    input: text,
    response_format: 'wav',
  })

  const buffer = Buffer.from(await response.arrayBuffer())

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'audio/wav',
      'Content-Length': buffer.length.toString(),
    },
  })
}
