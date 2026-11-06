import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { CookieBanner } from './CookieBanner'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  const { t } = useI18n()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <a className="skip" href="#contenu">
        {t('a11ySkip')}
      </a>
      <div className="topbar">
        <p>
          {t('demoBanner')}{' '}
          <Link to="/a-propos#demonstration">{t('demoBannerLink')}</Link>
        </p>
      </div>
      <Header />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
