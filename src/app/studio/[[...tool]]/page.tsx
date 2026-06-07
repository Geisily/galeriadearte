'use client'

import { Suspense, lazy } from 'react'

export const dynamic = 'force-dynamic'

function StudioFallback() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Inter, sans-serif',
        color: '#232323',
        fontSize: '1rem',
      }}
    >
      Carregando Studio...
    </div>
  )
}

const StudioContent = lazy(() => import('./StudioContent'))

export default function StudioPage() {
  return (
    <div style={{ height: '100vh' }}>
      <Suspense fallback={<StudioFallback />}>
        <StudioContent />
      </Suspense>
    </div>
  )
}
