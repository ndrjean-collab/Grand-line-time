import { useState, type FormEvent } from 'react'
import { Rich } from '../components/Rich'
import { useI18n } from '../i18n/I18nProvider'
import { useMeta } from '../lib/meta'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const empty: FormState = { name: '', email: '', subject: '', message: '' }

export function ContactPage() {
  const { locale, t } = useI18n()
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [done, setDone] = useState(false)
  useMeta(t('contactTitle'), t('metaContact'), locale)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = t('checkoutRequired')
    if (!form.email.trim()) next.email = t('checkoutRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t('checkoutEmailInvalid')
    if (!form.subject.trim()) next.subject = t('checkoutRequired')
    if (!form.message.trim()) next.message = t('checkoutRequired')
    setErrors(next)
    if (Object.keys(next).length === 0) setDone(true)
  }

  return (
    <div className="container page contact">
      <header className="page-hero">
        <h1>{t('contactTitle')}</h1>
        <p>{t('contactLede')}</p>
      </header>
      <div className="contact__grid">
        <form onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>{t('checkoutName')}</span>
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" />
            {errors.name ? <small className="field-error">{errors.name}</small> : null}
          </label>
          <label className="field">
            <span>{t('checkoutEmail')}</span>
            <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" />
            {errors.email ? <small className="field-error">{errors.email}</small> : null}
          </label>
          <label className="field">
            <span>{t('contactSubject')}</span>
            <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} />
            {errors.subject ? <small className="field-error">{errors.subject}</small> : null}
          </label>
          <label className="field">
            <span>{t('contactMessage')}</span>
            <textarea rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
            {errors.message ? <small className="field-error">{errors.message}</small> : null}
          </label>
          {done ? (
            <div className="notice" role="status">
              <h2>{t('contactSuccessTitle')}</h2>
              <p>
                <Rich text={t('contactSuccessText')} />
              </p>
            </div>
          ) : (
            <button className="btn btn--primary" type="submit">
              {t('contactSend')}
            </button>
          )}
        </form>
        <aside className="summary">
          <h2>{t('contactDirect')}</h2>
          <p>
            <span>{t('contactEmailLabel')}</span>
            <strong className="ph">[EMAIL]</strong>
          </p>
          <p>
            <span>{t('contactPhoneLabel')}</span>
            <strong className="ph">[TÉLÉPHONE]</strong>
          </p>
          <p>
            <span>{t('contactAddressLabel')}</span>
            <strong className="ph">[ADRESSE]</strong>
          </p>
          <p className="hint">{t('footerDomain')}</p>
        </aside>
      </div>
    </div>
  )
}
