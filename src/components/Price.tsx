import { useI18n } from '../i18n/I18nProvider'
import { formatMoney } from '../lib/money'

export function Price({ amount, rate = 0.2, large = false }: { amount: number; rate?: number; large?: boolean }) {
  const { locale, t } = useI18n()
  return (
    <p className={large ? 'price price--lg' : 'price'}>
      <strong>{formatMoney(amount, locale)}</strong>
      <span>{t('priceVatNote', { rate: `${Math.round(rate * 100)} %` })}</span>
    </p>
  )
}
