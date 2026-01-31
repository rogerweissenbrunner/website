'use client'

import {useEffect, useState, useTransition} from 'react'
import {useLocale, useTranslations} from 'next-intl'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faHome,
  faUser,
  faDesktop,
  faEnvelope,
  faSun,
  faMoon,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import {Link, usePathname, useRouter} from '@/i18n/navigation'
import {routing} from '@/i18n/routing'
import {useTheme} from './ThemeProvider'

const navItems = [
  {href: '/', labelKey: 'home', icon: faHome},
  {href: '/about', labelKey: 'about', icon: faUser},
  {href: '/services', labelKey: 'services', icon: faDesktop},
  {href: '/contact', labelKey: 'contact', icon: faEnvelope}
] as const

const localeFlags: Record<(typeof routing.locales)[number], string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  de: '🇩🇪',
  it: '🇮🇹',
  fr: '🇫🇷'
}
const LOCALE_COOKIE_NAME = 'RW_LOCALE'
const LOCALE_STORAGE_KEY = 'RW_LOCALE'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()
  const [isSwitchingLocale, setIsSwitchingLocale] = useState(false)
  const [pendingLocale, setPendingLocale] = useState<string | null>(null)
  const {theme, toggleTheme, mounted} = useTheme()
  const tNav = useTranslations('nav')
  const tTheme = useTranslations('theme')
  const tLang = useTranslations('lang')
  const showLocaleSpinner = isPending || isSwitchingLocale

  const persistLocale = (nextLocale: string) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`
  }

  useEffect(() => {
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY)
    const isValidStoredLocale =
      !!storedLocale &&
      routing.locales.includes(storedLocale as (typeof routing.locales)[number])

    if (isValidStoredLocale && storedLocale !== locale) {
      setIsSwitchingLocale(true)
      setPendingLocale(storedLocale)
      startTransition(() => {
        router.replace(pathname, {
          locale: storedLocale as (typeof routing.locales)[number]
        })
      })
      return
    }

    persistLocale(locale)
    // Run once on first client mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsSwitchingLocale(false)
    setPendingLocale(null)
  }, [pathname, locale])

  useEffect(() => {
    persistLocale(locale)
  }, [locale])

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === locale) return
    persistLocale(nextLocale)
    setIsSwitchingLocale(true)
    setPendingLocale(nextLocale)
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale})
      router.refresh()
    })
  }

  return (
    <header className="w-full items-center bg-transparent">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row flex-nowrap items-center md:justify-between animate-navbar-enter motion-reduce:animate-none">
        <div className="w-full py-8 text-center md:text-left md:w-auto md:flex-none">
          <Link
            href="/"
            locale={locale}
            prefetch={false}
            className="inline-block text-2xl font-bold font-serif tracking-wide"
          >
            Roger Weißenbrunner
          </Link>
        </div>
        <div className="w-full py-8 md:w-auto md:flex-1 md:min-w-0">
          <nav className="w-full">
            <ul className="flex flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center md:justify-end">
              {navItems.map(({href, labelKey, icon}) => (
                <li key={href}>
                  <Link
                    href={href}
                    locale={locale}
                    prefetch={false}
                    className={`nav-click-bounce nav-hover-glow inline-flex items-center text-sm ${
                      pathname === href
                        ? 'text-slate-900 dark:text-slate-200 font-medium'
                        : 'text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="md:mr-2 text-slate-800 dark:text-slate-400"
                    />
                    {tNav(labelKey)}
                  </Link>
                </li>
              ))}
              <li className="w-full flex justify-center mt-2 md:w-auto md:mt-0">
                <div className="flex items-center gap-3 md:gap-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 md:p-1.5 rounded outline-none focus-visible:ring-2 focus-visible:ring-current opacity-90 hover:opacity-100 transition-opacity border border-slate-400 dark:border-slate-600 disabled:opacity-50"
                    disabled={showLocaleSpinner}
                    aria-label={
                      mounted
                        ? theme === 'light'
                          ? tTheme('switchToDark')
                          : tTheme('switchToLight')
                        : tTheme('toggle')
                    }
                  >
                    <FontAwesomeIcon
                      icon={mounted && theme === 'light' ? faSun : faMoon}
                      className="size-5 md:size-4 text-slate-800 dark:text-slate-300"
                    />
                  </button>
                  <div
                    role="group"
                    aria-label={tLang('label')}
                    className="flex items-center gap-1"
                  >
                    {routing.locales.map((availableLocale) => {
                      const isActive = locale === availableLocale
                      const isCurrentSpinner =
                        showLocaleSpinner && pendingLocale === availableLocale
                      return (
                        <button
                          key={availableLocale}
                          type="button"
                          onClick={() => handleLocaleChange(availableLocale)}
                          disabled={showLocaleSpinner}
                          className={`group relative px-1.5 py-1 text-base md:text-sm leading-none transition-all ${
                            isActive
                              ? 'text-slate-900 dark:text-slate-100 drop-shadow-[0_0_6px_rgba(100,116,139,0.45)] dark:drop-shadow-[0_0_8px_rgba(148,163,184,0.55)]'
                              : 'opacity-70 hover:opacity-100 hover:drop-shadow-[0_0_7px_rgba(100,116,139,0.45)] dark:hover:drop-shadow-[0_0_8px_rgba(148,163,184,0.55)]'
                          } disabled:opacity-40`}
                          aria-pressed={isActive}
                          aria-label={tLang(`names.${availableLocale}`)}
                        >
                          {isCurrentSpinner ? (
                            <FontAwesomeIcon icon={faSpinner} spin className="text-sm" />
                          ) : (
                            localeFlags[availableLocale]
                          )}
                          <span className="absolute left-1/2 -translate-x-1/2 -top-7 px-1.5 py-0.5 rounded bg-slate-900 text-white text-[10px] whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-slate-200 dark:text-slate-900">
                            {tLang(`names.${availableLocale}`)}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
