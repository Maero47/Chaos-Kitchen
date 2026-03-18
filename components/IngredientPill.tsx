'use client'
import { useState, useRef, useEffect } from 'react'
import { getSwapOptions } from '@/lib/swaps'

interface Props {
  name: string
  emoji: string
  onSwap: (original: string, replacement: string | null) => void
}

export function IngredientPill({ name, emoji, onSwap }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const swapOptions = getSwapOptions(name)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = (swap: string) => {
    setSelected(swap)
    setOpen(false)
    setFlashing(true)
    setTimeout(() => setFlashing(false), 400)
    onSwap(name, swap)
  }

  const handleReset = () => {
    setSelected(null)
    setOpen(false)
    onSwap(name, null)
  }

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`
          px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 flex items-center gap-2
          ${flashing ? 'scale-110' : ''}
          ${selected
            ? 'bg-red-500/20 text-red-400 border-red-500/50 line-through decoration-red-400'
            : 'bg-white/5 border-white/10 text-gray-300 hover:border-orange-500/60 hover:bg-orange-500/10 hover:text-orange-300'
          }
        `}
      >
        <span>{emoji}</span>
        <span>{selected ? selected : name}</span>
        {selected && <span className="text-xs text-red-400 no-underline ml-1">☠️</span>}
        <span className={`text-xs ml-1 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-56 rounded-xl overflow-hidden shadow-2xl border border-white/10"
          style={{ background: 'rgba(15,15,15,0.97)', backdropFilter: 'blur(20px)' }}>
          <div className="px-3 py-2 border-b border-white/10">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Swap {name} with...</p>
          </div>
          {selected && (
            <button
              onClick={handleReset}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-500 hover:bg-white/5 border-b border-white/5 flex items-center gap-2"
            >
              <span>↩</span> Keep original
            </button>
          )}
          {swapOptions.map((swap) => (
            <button
              key={swap}
              onClick={() => handleSelect(swap)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-colors flex items-center gap-2"
            >
              <span>💀</span>
              <span>{swap}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
