import { useI18n } from '../i18n/I18nProvider'
import { MAX_QTY } from '../context/CartContext'

export function Qty({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  const { t } = useI18n()
  return (
    <div className="qty">
      <button type="button" aria-label={t('a11yDecrease')} onClick={() => onChange(value - 1)} disabled={value <= 1}>
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label={t('a11yIncrease')} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY}>
        +
      </button>
    </div>
  )
}
