import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCodeBranch, faHeadphones } from '@fortawesome/free-solid-svg-icons'
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
    namespace: 'meta.projects',
    pathname: '/projects'
  })
}

export default async function ProjectsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('projects')

  return (
    <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto gap-8 mt-8">
      <h1 className="font-serif text-2xl font-black">{t('title')}</h1>
      <p className="font-sans text-pretty">{t('p1')}</p>
      <p className="font-sans text-pretty">{t('p2')}</p>
      <section className="rounded-lg border border-slate-200/80 dark:border-slate-600/60 bg-slate-50/80 dark:bg-slate-800/40 p-5 shadow-sm">
        <h2 className="font-serif text-xl font-bold mb-3 flex flex-wrap items-center gap-2">
          <FontAwesomeIcon
            icon={faHeadphones}
            className="text-slate-800 dark:text-slate-400 shrink-0"
            aria-hidden
          />
          <Link
            href="/projects/white-noise"
            className="text-slate-900 dark:text-slate-100 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 dark:focus-visible:outline-slate-400"
          >
            {t('whiteNoiseTitle')}
          </Link>
        </h2>
        <p className="font-sans text-pretty">{t('whiteNoiseBlurb')}</p>
        <div className="flex justify-end items-center gap-2 mt-2">
          <a
            href="https://www.github.com/rogerweissenbrunner/whitenoise.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors p-0.5 rounded"
            aria-label={t('whiteNoiseGithubAria')}
          >
            <FontAwesomeIcon icon={faGithub} className="size-4" aria-hidden />
          </a>
          <a
            href="https://www.codeberg.org/rogerweissenbrunner/whitenoise.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors p-0.5 rounded"
            aria-label={t('whiteNoiseCodebergAria')}
          >
            <FontAwesomeIcon
              icon={faCodeBranch}
              className="size-4"
              aria-hidden
            />
          </a>
        </div>
      </section>
    </div>
  )
}
