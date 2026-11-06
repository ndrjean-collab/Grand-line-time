export type Locale = 'fr' | 'en' | 'de' | 'es' | 'it'

export type L10n = Record<Locale, string>

export interface Spec {
  label: L10n
  value: L10n
}

export interface Compatibility {
  make: string
  model: string
  detail?: string
  yearFrom?: number
  yearTo?: number
  engines?: string[]
}

export type Fulfillment = 'stock' | 'partner'

export interface Product {
  id: string
  slug: string
  sku: string
  mpn: string
  brand: string
  oeNumbers: string[]
  oem: string
  fictional: boolean
  category: string
  art: string
  /** Local official manufacturer photo, when one was found for this exact part number. */
  image?: string
  priceTtc: number
  vatRate: number
  fulfillment: Fulfillment
  leadMin: number
  leadMax: number
  bestSeller: boolean
  rank: number
  name: L10n
  summary: L10n
  description: L10n
  specs: Spec[]
  compatibility: Compatibility[]
}

export interface Engine {
  id: string
  name: L10n
}

export interface VehicleModel {
  id: string
  name: L10n
  years: number[]
  engines: Engine[]
}

export interface VehicleMake {
  id: string
  name: L10n
  models: VehicleModel[]
}

export interface Category {
  id: string
  art: string
}
