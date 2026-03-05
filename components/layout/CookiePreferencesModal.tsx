'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getConsent, saveConsent } from '@/lib/cookieConsent'

interface CookiePreferencesModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
}

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  id: string
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 flex-none items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-parchment-700 ${
        checked ? 'bg-parchment-700' : 'bg-parchment-200'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-[18px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}

export default function CookiePreferencesModal({
  open,
  onClose,
  onSave,
}: CookiePreferencesModalProps) {
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load current prefs whenever the modal opens
  useEffect(() => {
    if (!open) return
    const consent = getConsent()
    if (consent) {
      setAnalytics(consent.preferences.analytics)
      setMarketing(consent.preferences.marketing)
    }
  }, [open])

  // ESC → close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Focus panel on open
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => panelRef.current?.focus(), 60)
      return () => clearTimeout(id)
    }
  }, [open])

  const handleSave = () => {
    saveConsent({ analytics, marketing })
    onSave()
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="prefs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-parchment-900/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="prefs-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Cookie-stillingar"
            tabIndex={-1}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-x-4 top-[10%] z-[60] max-w-lg mx-auto bg-parchment-50 border border-parchment-200 shadow-2xl outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-parchment-200">
              <div>
                <p className="text-[10px] font-sans tracking-[0.35em] uppercase text-parchment-500 mb-1">
                  Stillingar
                </p>
                <h2 className="font-serif text-xl font-light text-parchment-900">
                  Cookie-stillingar
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Loka"
                className="ml-6 flex-none text-parchment-400 hover:text-parchment-900 transition-colors duration-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Category rows */}
            <div className="px-6 py-6 space-y-6">
              <p className="text-sm font-sans text-parchment-600 leading-relaxed">
                Þú getur valið hvaða flokkar af vafrakökum eru leyfðir.
                Nauðsynlegar vafrakökur eru alltaf virkar.
              </p>

              {/* Necessary – always on */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-sans font-medium text-parchment-900 mb-1">
                    Nauðsynlegar
                  </p>
                  <p className="text-xs font-sans text-parchment-500 leading-relaxed">
                    Þessar vafrakökur eru nauðsynlegar fyrir grunnvirkni
                    vefsíðunnar og geta ekki verið slökkt á þeim.
                  </p>
                </div>
                <span className="flex-none pt-0.5 text-[10px] font-sans tracking-widest uppercase text-parchment-400 whitespace-nowrap">
                  Alltaf virkar
                </span>
              </div>

              <div className="h-px bg-parchment-100" />

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label
                    htmlFor="toggle-analytics"
                    className="text-sm font-sans font-medium text-parchment-900 mb-1 block cursor-pointer"
                  >
                    Tölfræði og greining
                  </label>
                  <p className="text-xs font-sans text-parchment-500 leading-relaxed">
                    Hjálpa okkur að skilja hvernig gestir nota vefsíðuna svo
                    við getum bætt upplifunina.
                  </p>
                </div>
                <div className="flex-none pt-0.5">
                  <Toggle
                    checked={analytics}
                    onChange={setAnalytics}
                    id="toggle-analytics"
                  />
                </div>
              </div>

              <div className="h-px bg-parchment-100" />

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label
                    htmlFor="toggle-marketing"
                    className="text-sm font-sans font-medium text-parchment-900 mb-1 block cursor-pointer"
                  >
                    Markaðssetning
                  </label>
                  <p className="text-xs font-sans text-parchment-500 leading-relaxed">
                    Notaðar til að birta þér viðeigandi auglýsingar og mæla
                    árangur markaðsherferða.
                  </p>
                </div>
                <div className="flex-none pt-0.5">
                  <Toggle
                    checked={marketing}
                    onChange={setMarketing}
                    id="toggle-marketing"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-5 border-t border-parchment-200 bg-parchment-50">
              <Link
                href="/cookies"
                onClick={onClose}
                className="text-xs font-sans text-parchment-400 hover:text-parchment-700 transition-colors duration-200 underline-offset-2 hover:underline"
              >
                Fræðast meira um vafrakökur
              </Link>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-parchment-700 hover:text-parchment-900 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
              >
                Vista stillingar
                <span aria-hidden>→</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
