import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chaos Kitchen 🍳💥',
  description: 'Swap ingredients. Ruin dinner. Hear Gordon scream.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
