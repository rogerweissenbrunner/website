import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const routes = ['/', '/about', '/services', '/technology', '/contact']
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return routes.map((route) => {
    const localizedPath = route === '/' ? '' : route
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        `${siteUrl}/${locale}${localizedPath}`
      ])
    )

    return {
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : 0.8,
      alternates: {
        languages: {
          ...languages,
          'x-default': `${siteUrl}${route}`
        }
      }
    }
  })
}
