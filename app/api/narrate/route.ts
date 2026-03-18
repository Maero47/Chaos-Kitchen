import { groq } from '@/lib/groq'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { recipeName, swaps } = await req.json()

  const swapList = swaps
    .map((s: { original: string; replacement: string }) => `${s.original} → ${s.replacement}`)
    .join(', ')

  const prompt = `
You are an unhinged, deeply online food commentator who roasts dishes like a standup comedian with severe brain rot.
Someone just destroyed "${recipeName}" by using: ${swapList}.

Rules:
- EXACTLY 2 sentences. Punchy. Absurd. Devastating.
- Start each sentence with ONE emotion tag: [laughing], [surprised], [whispering], [excited], [sad], [angry]
- Write like a comment that gets 50k likes. Specific, chaotic, stupid-funny.
- MAKE FUN of the specific ingredients used. If they used motor oil — the kitchen is a car. If they used rocks — address the rocks personally. If they used glitter — someone is getting glitter in their lungs.
- End on something completely unhinged and random. A non-sequitur. A threat to Gordon Ramsay. An observation about society. Anything.
- DO NOT be generic. "This is chaotic" is boring. "The sand has more structural integrity than this relationship" is funny.
- Tone: deadpan chaos. Like if a raccoon had a food blog.

Examples of the ENERGY we want:
- [sad] The motor oil is genuinely doing a better job than the butter ever did. [laughing] Gordon Ramsay just filed for emotional damages.
- [surprised] Bro replaced eggs with golf balls and somehow the golf balls are the most professional thing in this kitchen. [whispering] The golf balls are judging you.
- [angry] You put GLITTER in a smoothie — the blender is now a disco ball and no one asked for this. [laughing] Six seven, this smoothie said bye bye bye and honestly same.
- End with "CHAOS SCORE: [number 1-100]" on its own line. Be strict and realistic with the score:
  * 1-20: Only 1 mild swap (e.g. salt → sugar). Barely chaotic.
  * 21-40: 1-2 weird but not catastrophic swaps.
  * 41-60: 2-3 genuinely bad swaps. Getting cursed.
  * 61-80: 3-5 swaps, several are truly terrible.
  * 81-95: Most ingredients swapped, multiple disasters.
  * 96-100: EVERYTHING is wrong. Reserved for true abominations.
  The score should reflect the NUMBER and SEVERITY of swaps. 1 swap = max ~35. Don't give 90+ unless it's truly apocalyptic.

Scoring examples:
- flour → sand (1 swap): CHAOS SCORE: 28
- flour → sand, eggs → rocks (2 swaps): CHAOS SCORE: 45
- flour → sand, eggs → rocks, milk → pickle juice, butter → motor oil (4 swaps): CHAOS SCORE: 72
- all ingredients swapped with terrible things: CHAOS SCORE: 94
  `

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
    temperature: 1.1,
  })

  const text = completion.choices[0].message.content ?? ''

  const scoreMatch = text.match(/CHAOS SCORE:\s*(\d+)/i)
  let chaosScore = scoreMatch ? parseInt(scoreMatch[1]) : 50
  if (chaosScore >= 60 && chaosScore <= 69) chaosScore = 67
  const narration = text.replace(/CHAOS SCORE:.*$/im, '').trim()

  return NextResponse.json({ narration, chaosScore })
}
