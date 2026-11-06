import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'

export function ReferenceSearch({ large = false, id = 'reference-search' }: { large?: boolean; id?: string }) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const query = q.trim()
    if (!query) return
    navigate(`/recherche?q=${encodeURIComponent(query)}`)
  }

  return (
    <form className={large ? 'search search--large' : 'search'} role="search" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={id}>
        {t('a11ySearch')}
      </label>
      <input
        id={id}
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder={t('searchPlaceholder')}
        autoComplete="off"
      />
      <button className="btn btn--primary" type="submit">
        {t('searchSubmit')}
      </button>
    </form>
  )
}
