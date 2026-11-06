import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CartProvider } from './context/CartContext'
import { I18nProvider } from './i18n/I18nProvider'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { InfoPage } from './pages/InfoPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <BrowserRouter basename={basename || undefined}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="catalogue" element={<CatalogPage />} />
              <Route path="catalogue/:categoryId" element={<CatalogPage />} />
              <Route path="recherche" element={<CatalogPage />} />
              <Route path="produit/:slug" element={<ProductPage />} />
              <Route path="panier" element={<CartPage />} />
              <Route path="commande" element={<CheckoutPage />} />
              <Route path="livraison" element={<InfoPage id="delivery" />} />
              <Route path="retours" element={<InfoPage id="returns" />} />
              <Route path="cgv" element={<InfoPage id="terms" />} />
              <Route path="mentions-legales" element={<InfoPage id="legal" />} />
              <Route path="confidentialite" element={<InfoPage id="privacy" />} />
              <Route path="a-propos" element={<InfoPage id="about" />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </I18nProvider>
  )
}
