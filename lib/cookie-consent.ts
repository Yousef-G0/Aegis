export type CookieConsent = {
  necessary: boolean
  analytics: boolean
  personalization: boolean
  decidedAt: string
}

const STORAGE_KEY = "aegis_cookie_consent"

export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CookieConsent) : null
  } catch {
    return null
  }
}

export function saveConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    // Mirror to a cookie so the server can read the choice on first paint.
    const expires = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000,
    ).toUTCString()
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(
      JSON.stringify(consent),
    )}; path=/; expires=${expires}; SameSite=Lax`
  } catch {
    // ignore storage failures
  }
}

export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics ?? false
}
