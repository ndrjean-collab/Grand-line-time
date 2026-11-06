import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'

export function Breadcrumbs({ items }: { items: { to?: string; label: string }[] }) {
  const { t } = useI18n()
  return (
    <nav className="crumbs" aria-label={t('a11yBreadcrumb')}>
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`}>
              {item.to && !last ? <Link to={item.to}>{item.label}</Link> : <span aria-current={last ? 'page' : undefined}>{item.label}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
