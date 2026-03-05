'use client'

/**
 * Thin client component used in the Footer to open the cookie preferences
 * modal without making the entire Footer a client component.
 * Fires a custom DOM event that CookieBanner listens for.
 */
export default function CookieSettingsButton() {
  return (
    <button
      onClick={() =>
        window.dispatchEvent(new CustomEvent('openCookieSettings'))
      }
      className="text-[11px] font-sans text-parchment-300 hover:text-parchment-500 transition-colors duration-200 tracking-wide"
    >
      Cookie-stillingar
    </button>
  )
}
