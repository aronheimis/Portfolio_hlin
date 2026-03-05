import AnimatedSection from './AnimatedSection'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="pt-36 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          {subtitle && (
            <p className="text-xs font-sans tracking-ultra uppercase text-parchment-600 mb-5">
              {subtitle}
            </p>
          )}
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide text-parchment-900">
            {title}
          </h1>
          <div className="w-12 h-px bg-parchment-600 mt-6" />
        </AnimatedSection>
      </div>
    </div>
  )
}
