interface Block {
  _type: string
  _key?: string
  style?: string
  children?: Array<{ _type: string; _key?: string; text?: string; marks?: string[] }>
  marks?: string[]
}

interface PortableTextProps {
  value: Block[]
}

export default function PortableText({ value }: PortableTextProps) {
  if (!value || !Array.isArray(value)) return null

  return (
    <>
      {value.map((block, i) => {
        if (block._type !== 'block' || !block.children) return null

        const text = block.children.map((span, j) => {
          if (!span.text) return null
          let node: React.ReactNode = span.text
          if (span.marks?.includes('strong')) node = <strong key={j}>{node}</strong>
          if (span.marks?.includes('em')) node = <em key={j}>{node}</em>
          return node
        })

        const key = block._key ?? i

        if (block.style === 'h2') {
          return (
            <h2 key={key} className="font-serif text-2xl font-light text-parchment-900 mb-4 mt-8">
              {text}
            </h2>
          )
        }
        if (block.style === 'h3') {
          return (
            <h3 key={key} className="font-serif text-xl font-light text-parchment-900 mb-3 mt-6">
              {text}
            </h3>
          )
        }

        return (
          <p key={key} className="text-base leading-relaxed text-parchment-700 mb-5">
            {text}
          </p>
        )
      })}
    </>
  )
}
