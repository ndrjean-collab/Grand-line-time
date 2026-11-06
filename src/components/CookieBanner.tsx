import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'

const STORAGE_KEY = 'glt-consent'

export function CookieBanner() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(STORAGE_KEY))
    } catch {
      setVisible(true)
    }
  }, [])

  function choose(value: 'all' | 'essential') {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie" role="dialog" aria-labelledby="cookie-title">
      <div>
        <p id="cookie-title">{t('cookieTitle')}</p>
        <p>
          {t('cookieText')} <Link to="/confidentialite">{t('navPrivacy')}</Link>
        </p>
      </div>
      <div className="cookie__actions">
        <button type="button" className="btn btn--ghost" onClick={() => choose('essential')}>
          {t('cookieEssential')}
        </button>
        <button type="button" className="btn btn--primary" onClick={() => choose('all')}>
          {t('cookieAccept')}
        </button>
      </div>
    </div>
  )
}
