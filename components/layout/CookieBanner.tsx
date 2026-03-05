'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getConsent, acceptAllConsent, rejectAllConsent } from '@/lib/cookieConsent'
import CookiePreferencesModal from './CookiePreferencesModal'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)

  // Show banner only when no valid consent record exists
  useEffect(() => {
    const consent = getConsent()
    if (!consent) setVisible(true)
  }, [])

  // Listen for "Cookie-stillingar" trigger from the Footer
  useEffect(() => {
    const handler = () => setPrefsOpen(true)
    window.addEventListener('openCookieSettings', handler)
    return () => window.removeEventListener('openCookieSettings', handler)
  }, [])

  const handleAcceptAll = () => {
    acceptAllConsent()
    setVisible(false)
  }

  const handleRejectAll = () => {
    rejectAllConsent()
    setVisible(false)
  }

  const handlePrefsSave = () => {
    setVisible(false)
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="cookie-banner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-parchment-50 border-t border-parchment-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <p className="text-xs font-sans text-parchment-600 leading-relaxed max-w-xl">
                Við notum vafrakökur til að tryggja bestu mögulegu upplifunina
                á vefsíðunni.{' '}
                <a
                  href="/cookies"
                  className="underline underline-offset-2 hover:text-parchment-900 transition-colors duration-200"
                >
                  Fræðast meira
                </a>
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-none">
                {/* Stillingar */}
                <button
                  onClick={() => setPrefsOpen(true)}
                  className="text-[11px] font-sans tracking-widest uppercase text-parchment-500 hover:text-parchment-900 transition-colors duration-200"
                >
                  Stillingar
                </button>

                {/* Hafna öllu */}
                <button
                  onClick={handleRejectAll}
                  className="text-[11px] font-sans tracking-widest uppercase text-parchment-600 hover:text-parchment-900 transition-colors duration-200 border border-parchment-300 hover:border-parchment-600 px-4 py-2"
                >
                  Hafna öllu
                </button>

                {/* Samþykkja allt */}
                <button
                  onClick={handleAcceptAll}
                  className="text-[11px] font-sans tracking-widest uppercase text-parchment-50 bg-parchment-800 hover:bg-parchment-900 transition-colors duration-200 px-4 py-2"
                >
                  Samþykkja allt
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePreferencesModal
        open={prefsOpen}
        onClose={() => setPrefsOpen(false)}
        onSave={handlePrefsSave}
      />
    </>
  )
}
