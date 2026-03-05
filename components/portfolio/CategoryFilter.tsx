'use client'

import type { ServiceCategory } from '@/types'

interface CategoryFilterProps {
  categories: ServiceCategory[]
  active: string
  onChange: (value: string) => void
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <nav
      aria-label="Flokkar"
      className="flex flex-wrap gap-x-6 gap-y-3 mb-12 mt-2"
    >
      <button
        onClick={() => onChange('all')}
        className={`text-xs font-sans tracking-widest uppercase pb-0.5 transition-all duration-300 ${
          active === 'all'
            ? 'text-parchment-900 border-b border-parchment-900'
            : 'text-parchment-500 hover:text-parchment-900'
        }`}
      >
        Allt
      </button>

      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`text-xs font-sans tracking-widest uppercase pb-0.5 transition-all duration-300 ${
            active === cat.value
              ? 'text-parchment-900 border-b border-parchment-900'
              : 'text-parchment-500 hover:text-parchment-900'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  )
}
