import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'

export function getLanguageAlternates(pathname: string) {
  const normalizedPath = pathname === '/' ? '' : pathname
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `/${locale}${normalizedPath}`])
  ) as Record<string, string>

  return {
    ...languages,
    'x-default': pathname
  }
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}

export function getLanguageAlternatesAbsolute(pathname: string) {
  const siteUrl = getSiteUrl()
  const normalizedPath = pathname === '/' ? '' : pathname

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${siteUrl}/${locale}${normalizedPath}`
    ])
  ) as Record<string, string>

  return {
    ...languages,
    'x-default': `${siteUrl}${pathname}`
  }
}

export function getCanonicalAbsolute(pathname: string) {
  const siteUrl = getSiteUrl()
  return `${siteUrl}${pathname}`
}

export async function getBasicPageMetadata(opts: {
  locale: string
  namespace: string
  pathname: string
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: opts.locale,
    namespace: opts.namespace
  })

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getCanonicalAbsolute(opts.pathname),
      languages: getLanguageAlternatesAbsolute(opts.pathname)
    }
  }
}
