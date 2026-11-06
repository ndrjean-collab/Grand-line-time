import { EU_COUNTRIES } from '../lib/eu'
import { useI18n } from '../i18n/I18nProvider'

export function EuList() {
  const { locale } = useI18n()
  const names = new Intl.DisplayNames([locale], { type: 'region' })
  const items = EU_COUNTRIES.map((code) => names.of(code) ?? code).sort((a, b) => a.localeCompare(b, locale))
  return (
    <ul className="eu-list">
      {items.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  )
}
