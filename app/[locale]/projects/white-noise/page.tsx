import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getBasicPageMetadata } from '@/i18n/metadata'

const WHITE_NOISE_TAGS = ['linux', 'gtk', 'vala', 'ubuntu'] as const

const LINK_CLASS =
  'font-bold italic underline text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300'
const MELODY_GITHUB_HREF = 'https://github.com/artemanufrij/playmymusic'
const ANUFRIJ_HREF = 'https://anufrij.org/'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return getBasicPageMetadata({
    locale,
    namespace: 'meta.projectsWhiteNoise',
    pathname: '/projects/white-noise'
  })
}

export default async function WhiteNoiseProjectPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('projectsWhiteNoise')

  return (
    <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto gap-6 mt-8">
      <h1 className="font-serif text-2xl font-black">{t('title')}</h1>
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-200/90 dark:border-slate-600/80 bg-slate-100/40 dark:bg-slate-900/50 shadow-md ring-1 ring-black/5 dark:ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element -- static asset from /public; avoids /_next/image issues on Netlify */}
        <img
          src="/projects/whitenoise.png"
          alt={t('heroAlt')}
          width={1533}
          height={842}
          className="w-full h-auto object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-sans text-pretty">{t('p1')}</p>
        <p className="font-sans text-pretty">
          {t('p2Before')}
          <a
            href={MELODY_GITHUB_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            Melody
          </a>
          {t('p2Between')}
          <a
            href={ANUFRIJ_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            Artem Anufrij
          </a>
          {t('p2After')}
        </p>
        <ul
          className="flex flex-wrap gap-1.5 list-none p-0 m-0"
          aria-label={t('tagsLabel')}
        >
          {WHITE_NOISE_TAGS.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded border border-slate-200/90 dark:border-slate-600/70 bg-slate-50/90 dark:bg-slate-800/35 px-1.5 py-px text-[0.65rem] leading-snug font-sans font-normal lowercase tracking-normal text-slate-500 dark:text-slate-400">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-md border border-slate-300/90 dark:border-slate-600 bg-slate-100/90 dark:bg-slate-800/80 px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-200/90 dark:hover:bg-slate-700/80 transition-colors motion-reduce:transition-none"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-slate-700 dark:text-slate-300"
            aria-hidden
          />
          {t('backToProjects')}
        </Link>
        <div className="flex flex-wrap gap-3 justify-end ml-auto">
          <a
            href="https://www.github.com/rogerweissenbrunner/whitenoise.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-300/90 dark:border-slate-600 bg-slate-100/90 dark:bg-slate-800/80 px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-200/90 dark:hover:bg-slate-700/80 transition-colors motion-reduce:transition-none"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-lg text-slate-800 dark:text-slate-300"
              aria-hidden
            />
            {t('viewOnGithub')}
          </a>
          <a
            href="https://www.codeberg.org/rogerweissenbrunner/whitenoise.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-300/90 dark:border-slate-600 bg-slate-100/90 dark:bg-slate-800/80 px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-200/90 dark:hover:bg-slate-700/80 transition-colors motion-reduce:transition-none"
          >
            <FontAwesomeIcon
              icon={faCodeBranch}
              className="text-lg text-slate-800 dark:text-slate-300"
              aria-hidden
            />
            {t('viewOnCodeberg')}
          </a>
        </div>
      </div>
    </div>
  )
}
