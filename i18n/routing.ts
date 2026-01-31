import {defineRouting} from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'de', 'it', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'never',
  localeCookie: {
    name: 'RW_LOCALE',
    maxAge: 60 * 60 * 24 * 365
  }
})

export type AppLocale = (typeof routing.locales)[number]
