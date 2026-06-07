import { Helmet } from 'react-helmet-async'
import { artistInfo } from '../lib/mockData'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  jsonLd?: object
}

const BASE_URL = 'https://geisily.github.io/galeriadearte'
const DEFAULT_IMAGE = `${BASE_URL}/og-default.jpg`
const SITE_NAME = `${artistInfo.name} — Pintura Realista`

export function SEO({
  title,
  description = 'Obras originais de pintura a óleo realista. Adquira telas únicas e acompanhe o processo criativo no TikTok @alemaovargasmoreira.',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${artistInfo.name}` : SITE_NAME

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
