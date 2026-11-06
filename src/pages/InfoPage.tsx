import { EuList } from '../components/EuList'
import { Rich } from '../components/Rich'
import { docs, type DocId } from '../content/pages'
import { useI18n } from '../i18n/I18nProvider'
import { useMeta } from '../lib/meta'
import type { CopyKey } from '../i18n/copy'

const metaKeys: Record<DocId, CopyKey> = {
  about: 'metaAbout',
  delivery: 'metaDelivery',
  returns: 'metaReturns',
  terms: 'metaTerms',
  legal: 'metaLegal',
  privacy: 'metaPrivacy',
}

export function InfoPage({ id }: { id: DocId }) {
  const { locale, t } = useI18n()
  const doc = docs[id]
  useMeta(doc.title[locale], t(metaKeys[id]), locale)

  return (
    <article className="container page prose">
      <p className="eyebrow">{t('demoKicker')}</p>
      <h1>{doc.title[locale]}</h1>
      <p className="lede">{doc.lede[locale]}</p>
      {doc.blocks.map((block, index) => {
        if (block.kind === 'h2') {
          return (
            <h2 id={block.id} key={index}>
              {block.text[locale]}
            </h2>
          )
        }
        if (block.kind === 'p') {
          return (
            <p key={index}>
              <Rich text={block.text[locale]} />
            </p>
          )
        }
        if (block.kind === 'callout') {
          return (
            <p className="callout" id={block.id} key={index}>
              <Rich text={block.text[locale]} />
            </p>
          )
        }
        if (block.kind === 'ul') {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item.fr}>
                  <Rich text={item[locale]} />
                </li>
          ))}
            </ul>
          )
        }
        if (block.kind === 'eu') return <EuList key={index} />
        return (
          <div className="table-scroll" key={index}>
            <table>
              <caption>{block.caption[locale]}</caption>
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header.fr} scope="col">
                      {header[locale]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.map((cell) => cell.fr).join('|')}>
                    {row.map((cell) => (
                      <td key={cell.fr}>
                        <Rich text={cell[locale]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </article>
  )
}
