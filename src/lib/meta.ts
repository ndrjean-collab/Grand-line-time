import { useEffect } from 'react'
import type { Locale } from '../types'

const ogLocale: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  de: 'de_DE',
  es: 'es_ES',
  it: 'it_IT',
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export function useMeta(title: string, description: string, locale: Locale) {
  useEffect(() => {
    const full = title.includes('Grand Line Time') ? title : `${title} · Grand Line Time`
    document.title = full
    document.documentElement.lang = locale
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:locale', ogLocale[locale])
  }, [title, description, locale])
}
