import type { Locale } from '../types'

const intlLocale: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  de: 'de-DE',
  es: 'es-ES',
  it: 'it-IT',
}

export function formatMoney(amount: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function splitVat(ttc: number, rate = 0.2) {
  const ht = ttc / (1 + rate)
  return { ht, vat: ttc - ht, ttc }
}
