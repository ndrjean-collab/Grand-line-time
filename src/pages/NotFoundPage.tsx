import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useMeta } from '../lib/meta'

export function NotFoundPage() {
  const { locale, t } = useI18n()
  useMeta(t('notFoundTitle'), t('notFoundText'), locale)
  return (
    <div className="container page">
      <header className="page-hero">
        <p className="eyebrow">404</p>
        <h1>{t('notFoundTitle')}</h1>
        <p>{t('notFoundText')}</p>
        <Link className="btn btn--dark" to="/">
          {t('notFoundCta')}
        </Link>
      </header>
    </div>
  )
}
