'use client'

import { motion } from 'framer-motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = '',
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
