import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { findMake, findModel, vehicles } from '../lib/catalog'

export function VehicleSelector({ categoryId, idPrefix = 'vehicle' }: { categoryId?: string; idPrefix?: string }) {
  const { locale, t } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [make, setMake] = useState(params.get('make') ?? '')
  const [model, setModel] = useState(params.get('model') ?? '')
  const [year, setYear] = useState(params.get('year') ?? '')
  const [engine, setEngine] = useState(params.get('engine') ?? '')
  const [error, setError] = useState(false)

  const makeObj = findMake(make)
  const modelObj = findModel(make, model)

  function chooseMake(value: string) {
    setMake(value)
    setModel('')
    setYear('')
    setEngine('')
    setError(false)
  }

  function chooseModel(value: string) {
    setModel(value)
    setYear('')
    setEngine('')
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!make) {
      setError(true)
      return
    }
    const next = new URLSearchParams()
    next.set('make', make)
    if (model) next.set('model', model)
    if (year) next.set('year', year)
    if (engine) next.set('engine', engine)
    const path = categoryId ? `/catalogue/${categoryId}` : '/catalogue'
    navigate(`${path}?${next.toString()}`)
  }

  return (
    <form className="selector" onSubmit={onSubmit}>
      <div className="selector__head">
        <h2>{t('selectorTitle')}</h2>
        <p>{t('selectorNote')}</p>
      </div>
      <div className="selector__grid">
        <label className="field">
          <span>{t('selectorMake')}</span>
          <select id={`${idPrefix}-make`} value={make} onChange={(event) => chooseMake(event.target.value)}>
            <option value="">{t('selectorChoose')}</option>
            {vehicles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name[locale]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t('selectorModel')}</span>
          <select
            id={`${idPrefix}-model`}
            value={model}
            disabled={!makeObj}
            onChange={(event) => chooseModel(event.target.value)}
          >
            <option value="">{t('selectorChoose')}</option>
            {makeObj?.models.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name[locale]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t('selectorYear')}</span>
          <select id={`${idPrefix}-year`} value={year} disabled={!modelObj} onChange={(event) => setYear(event.target.value)}>
            <option value="">{t('selectorChoose')}</option>
            {modelObj?.years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t('selectorEngine')}</span>
          <select
            id={`${idPrefix}-engine`}
            value={engine}
            disabled={!modelObj}
            onChange={(event) => setEngine(event.target.value)}
          >
            <option value="">{t('selectorChoose')}</option>
            {modelObj?.engines.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name[locale]}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error ? <p className="field-error">{t('selectorNeedMake')}</p> : null}
      <button className="btn btn--primary" type="submit">
        {t('selectorSubmit')}
      </button>
    </form>
  )
}
