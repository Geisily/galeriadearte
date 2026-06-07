import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { GalleryPage } from './pages/GalleryPage'
import { ArtworkDetailPage } from './pages/ArtworkDetailPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { AboutPage } from './pages/AboutPage'
import { VideosPage } from './pages/VideosPage'
import { ContactPage } from './pages/ContactPage'

const StudioPage = lazy(() => import('./pages/StudioPage'))

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div style={{ padding: 40, color: '#1d3a4a' }}>Carregando painel...</div>}>
                <StudioPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
                <Navbar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/galeria" element={<GalleryPage />} />
                    <Route path="/obra/:slug" element={<ArtworkDetailPage />} />
                    <Route path="/carrinho" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/sobre" element={<AboutPage />} />
                    <Route path="/videos" element={<VideosPage />} />
                    <Route path="/contato" element={<ContactPage />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
