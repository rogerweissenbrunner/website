import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getBasicPageMetadata } from '@/i18n/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return getBasicPageMetadata({
    locale,
    namespace: 'meta.about',
    pathname: '/about'
  })
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const cvHref = `/files/rogerweissenbrunner-cv-${locale}.pdf`

  return (
    <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto gap-4 mt-8">
      <h1 className="font-serif text-2xl font-black">{t('title')}</h1>
      <p className="font-sans text-pretty">{t('p1')}</p>
      <p className="font-sans text-pretty">{t('p2')}</p>
      <p className="font-sans text-pretty">
        {t('p3Start')}{' '}
        <a
          href={cvHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold italic underline"
        >
          {t('p3LinkCv')}
        </a>
        {t('p3BetweenCvAndWork')}
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
