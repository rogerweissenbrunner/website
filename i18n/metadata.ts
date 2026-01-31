const locales = ['en', 'es', 'de', 'it', 'fr'] as const

export function getLanguageAlternates(pathname: string) {
  const normalizedPath = pathname === '/' ? '' : pathname
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `/${locale}${normalizedPath}`])
  ) as Record<string, string>

  return {
    ...languages,
    'x-default': pathname
  }
}
