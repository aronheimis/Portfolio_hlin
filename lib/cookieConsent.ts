// ─── Cookie Consent Utility ───────────────────────────────────────────────────
// Versioned consent record persisted to localStorage.
// Bump CONSENT_VERSION if you materially change the consent categories
// so existing users are re-prompted.

export const CONSENT_VERSION = 1
export const CONSENT_KEY = 'hlin_cookie_consent'

export interface ConsentPreferences {
  necessary: true      // always true – cannot be toggled off
  analytics: boolean
  marketing: boolean
}

export interface ConsentRecord {
  version: number
  timestamp: string    // ISO-8601
  preferences: ConsentPreferences
}

/** Returns the stored consent record, or null if missing / version mismatch. */
export function getConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

/** Persists a new consent record and returns it. */
export function saveConsent(
  prefs: Omit<ConsentPreferences, 'necessary'>
): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    preferences: { necessary: true, ...prefs },
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
  return record
}

/** Convenience: accept all cookie categories. */
export const acceptAllConsent = () =>
  saveConsent({ analytics: true, marketing: true })

/** Convenience: reject all optional cookie categories. */
export const rejectAllConsent = () =>
  saveConsent({ analytics: false, marketing: false })
