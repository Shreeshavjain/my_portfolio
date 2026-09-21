import { MetadataRoute } from 'next'
import { seo } from '@/data/siteConfig'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // If you ever add a private admin area
    },
    sitemap: `${seo.url}/sitemap.xml`,
  }
}