import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alemaovargasmoreira.com.br'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/conta/', '/checkout/', '/carrinho/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
