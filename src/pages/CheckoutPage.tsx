import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useI18n } from '../i18n/I18nProvider'
import { getProductById } from '../lib/catalog'
import { EU_COUNTRIES } from '../lib/eu'
import { formatMoney, splitVat } from '../lib/money'
import { useMeta } from '../lib/meta'

interface FormState {
  name: string
  email: string
  phone: string
  address: string
  postal: string
  city: string
  country: string
}

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  postal: '',
  city: '',
  country: 'FR',
}

export function CheckoutPage() {
  const { lines } = useCart()
  const { locale, t } = useI18n()
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [done, setDone] = useState(false)
  useMeta(t('checkoutTitle'), t('metaCheckout'), locale)

  const detailed = lines.flatMap((line) => {
    const product = getProductById(line.productId)
    return product ? [{ line, product }] : []
  })
  const total = splitVat(detailed.reduce((sum, item) => sum + item.product.priceTtc * item.line.qty, 0))
  const countries = useMemo(() => {
    const names = new Intl.DisplayNames([locale], { type: 'region' })
    return EU_COUNTRIES.map((code) => ({ code, label: names.of(code) ?? code })).sort((a, b) =>
      a.label.localeCompare(b.label, locale),
    )
  }, [locale])

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = t('checkoutRequired')
    if (!form.email.trim()) next.email = t('checkoutRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t('checkoutEmailInvalid')
    if (!form.address.trim()) next.address = t('checkoutRequired')
    if (!form.postal.trim()) next.postal = t('checkoutRequired')
    if (!form.city.trim()) next.city = t('checkoutRequired')
    setErrors(next)
    if (Object.keys(next).length === 0) setDone(true)
  }

  return (
    <div className="container page">
      <header className="page-hero">
        <p className="eyebrow">{t('demoKicker')}</p>
        <h1>{t('checkoutTitle')}</h1>
      </header>
      <p className="callout">{t('checkoutBanner')}</p>
      {detailed.length === 0 ? (
        <div className="empty">
          <h2>{t('cartEmptyTitle')}</h2>
          <Link className="btn btn--dark" to="/catalogue">
            {t('cartContinue')}
          </Link>
        </div>
      ) : (
        <div className="checkout">
          <form onSubmit={onSubmit} noValidate>
            <ol className="steps">
              <li>{t('checkoutContact')}</li>
              <li>{t('checkoutShip')}</li>
              <li className="is-locked">{t('checkoutPay')}</li>
            </ol>
            <div className="form-grid">
              <Field label={t('checkoutName')} error={errors.name}>
                <input value={form.name} onChange={(event) => set('name', event.target.value)} autoComplete="name" />
              </Field>
              <Field label={t('checkoutEmail')} error={errors.email}>
                <input value={form.email} onChange={(event) => set('email', event.target.value)} autoComplete="email" inputMode="email" />
              </Field>
              <Field label={t('checkoutPhone')} error={errors.phone}>
                <input value={form.phone} onChange={(event) => set('phone', event.target.value)} autoComplete="tel" />
              </Field>
              <Field label={t('checkoutAddress')} error={errors.address} wide>
                <input value={form.address} onChange={(event) => set('address', event.target.value)} autoComplete="street-address" />
              </Field>
              <Field label={t('checkoutPostal')} error={errors.postal}>
                <input value={form.postal} onChange={(event) => set('postal', event.target.value)} autoComplete="postal-code" />
              </Field>
              <Field label={t('checkoutCity')} error={errors.city}>
                <input value={form.city} onChange={(event) => set('city', event.target.value)} autoComplete="address-level2" />
              </Field>
              <Field label={t('checkoutCountry')} wide>
                <select value={form.country} onChange={(event) => set('country', event.target.value)}>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="locked">
              <strong>{t('checkoutPay')}</strong>
              <p>{t('checkoutPayLocked')}</p>
            </div>
            {done ? (
              <div className="notice" role="status">
                <h2>{t('checkoutSuccessTitle')}</h2>
                <p>{t('checkoutSuccessText')}</p>
              </div>
            ) : (
              <button className="btn btn--primary" type="submit">
                {t('checkoutSubmit')}
              </button>
            )}
          </form>
          <aside className="summary">
            <h2>{t('checkoutSummary')}</h2>
            <ul>
              {detailed.map(({ line, product }) => (
                <li key={product.id}>
                  <span>
                    {product.name[locale]} × {line.qty}
                  </span>
                  <span>{formatMoney(product.priceTtc * line.qty, locale)}</span>
                </li>
              ))}
            </ul>
            <p className="summary__total">
              <span>{t('cartTotal')}</span>
              <strong>{formatMoney(total.ttc, locale)}</strong>
            </p>
            <p className="hint">{t('cartNote')}</p>
            <Link className="text-link" to="/panier">
              {t('checkoutBack')}
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  error,
  wide = false,
  children,
}: {
  label: string
  error?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <label className={wide ? 'field field--wide' : 'field'}>
      <span>{label}</span>
      {children}
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}
