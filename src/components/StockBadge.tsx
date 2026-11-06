import { useI18n } from '../i18n/I18nProvider'
import type { Product } from '../types'

export function StockBadge({ product, detail = false }: { product: Product; detail?: boolean }) {
  const { t } = useI18n()
  const partner = product.fulfillment === 'partner'
  const label = detail
    ? t(partner ? 'stockPartnerDetail' : 'stockInDetail', { min: product.leadMin, max: product.leadMax })
    : t(partner ? 'stockPartner' : 'stockIn')
  return <span className={partner ? 'badge badge--partner' : 'badge badge--stock'}>{label}</span>
}
