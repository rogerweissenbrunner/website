import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {Link} from '@/i18n/navigation'
import {getLanguageAlternates} from '@/i18n/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'meta.about'})

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/about',
      languages: getLanguageAlternates('/about')
    }
  }
}

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')

  return (
    <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto gap-4 mt-8">
      <h1 className="font-serif text-2xl font-black">{t('title')}</h1>
      <p className="font-sans text-pretty">{t('p1')}</p>
      <p className="font-sans text-pretty">{t('p2')}</p>
      <p className="font-sans text-pretty">
        {t('p3Start')}{' '}
        <a
          href="https://github.com/rogerweissenbrunner"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('p3LinkWork')}
        </a>{' '}
        {t('p3Middle')}{' '}
        <Link href="/contact" className="font-bold italic underline">
          {t('p3LinkContact')}
        </Link>{' '}
        {t('p3End')}
      </p>
    </div>
  )
}
