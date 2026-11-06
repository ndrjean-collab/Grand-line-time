import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { copy, type CopyKey } from './copy'
import type { Locale } from '../types'

const STORAGE_KEY = 'glt-locale'

interface I18nValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: CopyKey, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function isLocale(value: string | null): value is Locale {
  return value === 'fr' || value === 'en' || value === 'de' || value === 'es' || value === 'it'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return isLocale(saved) ? saved : 'fr'
    } catch {
      return 'fr'
    }
  })

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const t = useCallback(
    (key: CopyKey, vars?: Record<string, string | number>) => {
      const template = copy[key][locale]
      if (!vars) return template
      return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''))
    },
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
