import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from 'next-intl/server'
import { ThemeBootScript } from '@/components/ThemeBootScript'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BootReadySync } from '@/components/BootReadySync'
import { RouteTransition } from '@/components/RouteTransition'
import { routing } from '@/i18n/routing'
import {
  getCanonicalAbsolute,
  getLanguageAlternatesAbsolute
} from '@/i18n/metadata'
import '../globals.css'

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const metadataBase = new URL(siteUrl ?? 'http://localhost:3000')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e2e8f0' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'site' })

  return {
    metadataBase,
    applicationName: t('defaultTitle'),
    title: {
      default: t('defaultTitle'),
      template: t('titleTemplate')
    },
    description: t('description'),
    authors: [{ name: 'Roger Weißenbrunner' }],
    keywords: [
      'Roger Weißenbrunner',
      'Full-stack engineer',
      'Ruby',
      'Ruby on Rails',
      'PostgreSQL',
      'Open source'
    ],
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: getCanonicalAbsolute('/'),
      languages: getLanguageAlternatesAbsolute('/')
    },
    icons: {
      icon: [{ url: '/profile.png', type: 'image/png' }],
      apple: [{ url: '/profile.png' }]
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black',
      title: t('defaultTitle')
    },
    openGraph: {
      type: 'website',
      locale,
      siteName: t('defaultTitle'),
      title: t('defaultTitle'),
      description: t('description'),
      images: [{ url: '/profile.png' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('description'),
      images: ['/profile.png']
    },
    other: {
      google: 'nositelinkssearchbox'
    }
  }
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          httpEquiv="x-ua-compatible"
          content="IE=edge,chrome=1,requiresActiveX=true"
        />
        <meta httpEquiv="imagetoolbar" content="false" />
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
        <link type="text/plain" rel="author" href="/humans.txt" />
        <style>{`
          @keyframes bootSpin {
            to { transform: rotate(360deg); }
          }
          #boot-loader {
            position: fixed;
            inset: 0;
            display: grid;
            place-items: center;
            background: #ffffff;
            z-index: 9999;
            opacity: 1;
            pointer-events: auto;
            transition: opacity 120ms ease;
          }
          html.dark #boot-loader {
            background: #0f172a;
          }
          @media (prefers-color-scheme: dark) {
            #boot-loader {
              background: #0f172a;
            }
          }
          html.boot-ready #boot-loader {
            opacity: 0;
            pointer-events: none;
          }
          #boot-loader .spinner {
            width: 1.75rem;
            height: 1.75rem;
            border: 3px solid #cbd5e1;
            border-top-color: #334155;
            border-radius: 9999px;
            animation: bootSpin 520ms linear infinite;
          }
          html.dark #boot-loader .spinner {
            border-color: #334155;
            border-top-color: #e2e8f0;
          }
        `}</style>
        <ThemeBootScript />
      </head>
      <body className="font-sans bg-gradient-to-b from-white/95 to-slate-300/95 text-slate-900 dark:bg-gradient-to-b dark:from-slate-800 dark:to-black dark:text-slate-100 antialiased">
        <BootReadySync />
        <div id="boot-loader" aria-hidden="true">
          <div className="spinner" />
        </div>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="w-full h-full min-h-screen flex flex-col flex-nowrap">
              <Header />
              <main className="grow flex flex-col mx-auto w-full h-full max-w-5xl p-4">
                <RouteTransition>{children}</RouteTransition>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
