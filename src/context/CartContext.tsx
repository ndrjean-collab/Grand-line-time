import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProductById } from '../lib/catalog'

const STORAGE_KEY = 'glt-cart'
export const MAX_QTY = 10

export interface CartLine {
  productId: string
  qty: number
}

interface CartValue {
  lines: CartLine[]
  count: number
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
}

const CartContext = createContext<CartValue | null>(null)

function sanitize(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return []
  const lines: CartLine[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') continue
    const productId = (item as { productId?: unknown }).productId
    const qty = (item as { qty?: unknown }).qty
    if (typeof productId !== 'string' || typeof qty !== 'number') continue
    if (!getProductById(productId)) continue
    const safe = Math.max(1, Math.min(MAX_QTY, Math.round(qty)))
    const existing = lines.find((line) => line.productId === productId)
    if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + safe)
    else lines.push({ productId, qty: safe })
  }
  return lines
}

function read(): CartLine[] {
  try {
    return sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null'))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(read)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* ignore quota / private mode */
    }
  }, [lines])

  const add = useCallback((productId: string, qty = 1) => {
    if (!getProductById(productId)) return
    const amount = Math.max(1, Math.min(MAX_QTY, Math.round(qty)))
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId)
      if (!existing) return [...current, { productId, qty: amount }]
      return current.map((line) =>
        line.productId === productId ? { ...line, qty: Math.min(MAX_QTY, line.qty + amount) } : line,
      )
    })
  }, [])

  const setQty = useCallback((productId: string, qty: number) => {
    const safe = Math.round(qty)
    setLines((current) => {
      if (safe <= 0) return current.filter((line) => line.productId !== productId)
      return current.map((line) =>
        line.productId === productId ? { ...line, qty: Math.min(MAX_QTY, safe) } : line,
      )
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.productId !== productId))
  }, [])

  const count = lines.reduce((sum, line) => sum + line.qty, 0)
  const value = useMemo(() => ({ lines, count, add, setQty, remove }), [lines, count, add, setQty, remove])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
