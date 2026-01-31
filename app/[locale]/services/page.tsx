import type {Metadata} from 'next'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDatabase, faGem, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {Link} from '@/i18n/navigation'
import {getLanguageAlternates} from '@/i18n/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'meta.services'})

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/services',
      languages: getLanguageAlternates('/services')
    }
  }
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')

  return (
    <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto gap-8 mt-8">
      <h1 className="font-serif text-2xl font-black">{t('title')}</h1>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">
          <FontAwesomeIcon
            icon={faGem}
            className="mr-2 text-slate-800 dark:text-slate-400"
          />
          {t('rubyTitle')}
        </h2>
        <p className="font-sans text-pretty">{t('rubyBody')}</p>
      </div>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">
          <FontAwesomeIcon
            icon={faDatabase}
            className="mr-2 text-slate-800 dark:text-slate-400"
          />
          {t('postgresTitle')}
        </h2>
        <p className="font-sans text-pretty">{t('postgresBody')}</p>
      </div>
      <div className="text-sm bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
        <p className="font-sans text-pretty">
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="mr-2 text-slate-800 dark:text-slate-400"
          />
          {t('infoStart')}{' '}
          <Link href="/technology" className="font-bold italic underline">
            {t('infoLink')}
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
