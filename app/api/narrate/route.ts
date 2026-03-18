import { groq } from '@/lib/groq'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { recipeName, swaps } = await req.json()

  const swapList = swaps
    .map((s: { original: string; replacement: string }) => `${s.original} → ${s.replacement}`)
    .join(', ')

  const prompt = `
You are a chaotic, extremely online food commentator who has seen too much internet content.
Someone just cooked "${recipeName}" with these substitutions: ${swapList}.

Narrate what happens when they cook it. Rules:
- 3-4 sentences maximum
- Use emotion tags at the start of sentences for the TTS voice: [laughing], [surprised], [whispering], [excited], [sad], [angry]
- Be funny, unhinged, and reference popular internet memes and culture naturally where it fits
- You can reference things like: "this is not going to pass the vibe check", "bro really said no cap", "the Italian brain rot got to them", "six seven", "nothing beats a Jet2 holiday", "this has Ballerina Cappuccina energy", "chicken jockey moment", "this is giving main character syndrome", "the Gen Z stare is the only appropriate reaction", "bro really thought they cooked (they did not cook)", "this dish has left the chat", "not the Coldplay kiss cam catching this dish in 4K"
- Keep it absurd, punchy, and genuinely funny — like a TikTok comment section came to life
- End with "CHAOS SCORE: [number 1-100]" on its own line. Higher = more chaotic.

Example format:
[surprised] Bro really said "flour is overrated" and used sand — no cap this is not passing the vibe check. [laughing] The whole kitchen is giving Italian brain rot energy right now, Bombardiro Crocodilo would not stand for this. [whispering] The dish has left the chat. [sad] CHAOS SCORE: 91
  `

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
    temperature: 1.1,
  })

  const text = completion.choices[0].message.content ?? ''

  const scoreMatch = text.match(/CHAOS SCORE:\s*(\d+)/i)
  const chaosScore = scoreMatch ? parseInt(scoreMatch[1]) : 50
  const narration = text.replace(/CHAOS SCORE:.*$/im, '').trim()

  return NextResponse.json({ narration, chaosScore })
}
