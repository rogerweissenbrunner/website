import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faMastodon,
  faPixelfed
} from '@fortawesome/free-brands-svg-icons'
import { faCodeBranch, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getBasicPageMetadata } from '@/i18n/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return getBasicPageMetadata({ locale, namespace: 'meta.home', pathname: '/' })
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const tHome = await getTranslations('home')
  const tSite = await getTranslations('site')

  return (
    <div className="w-full h-full max-w-2xl flex flex-col flex-nowrap mx-auto items-center justify-center gap-16 mt-8">
      <div>
        <h1 className="font-serif text-2xl font-black w-full text-center">
          {tSite('name')}
        </h1>
        <h2 className="font-serif text-lg italic text-slate-500 w-full text-center">
          {tHome('role')}
        </h2>
      </div>
      <div className="items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile.png"
          alt={tHome('imageAlt')}
          width={192}
          height={192}
          className="profile-glow rounded-full size-32 md:size-48"
          fetchPriority="high"
        />
      </div>
      <ul className="flex flex-wrap justify-center gap-6 w-full max-w-sm mx-auto sm:max-w-none sm:flex-nowrap sm:justify-around">
        <li className="basis-[30%] sm:basis-auto">
          <a
            rel="me noopener noreferrer"
            href="https://mastodon.social/@rogerweissenbrunner"
            target="_blank"
            className="social-link flex flex-col flex-nowrap items-center gap-2 text-xs hover:text-slate-500"
          >
            <FontAwesomeIcon
              icon={faMastodon}
              className="social-icon text-5xl sm:text-[3.2rem] text-slate-800 dark:text-slate-400"
            />
            Mastodon
          </a>
        </li>
        <li className="basis-[30%] sm:basis-auto">
          <a
            href="https://gram.social/rogerweissenbrunner"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex flex-col flex-nowrap items-center gap-2 text-xs hover:text-slate-500"
          >
            <FontAwesomeIcon
              icon={faPixelfed}
              className="social-icon text-5xl sm:text-[3.2rem] text-slate-800 dark:text-slate-400"
            />
            Pixelfed/Gram
          </a>
        </li>
        <li className="basis-[30%] sm:basis-auto">
          <a
            href="https://www.codeberg.org/rogerweissenbrunner"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex flex-col flex-nowrap items-center gap-2 text-xs hover:text-slate-500"
          >
            <FontAwesomeIcon
              icon={faCodeBranch}
              className="social-icon text-5xl sm:text-[3.2rem] text-slate-800 dark:text-slate-400"
            />
            Codeberg
          </a>
        </li>
        <li className="basis-[30%] sm:basis-auto">
          <a
            href="https://www.github.com/rogerweissenbrunner"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex flex-col flex-nowrap items-center gap-2 text-xs hover:text-slate-500"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="social-icon text-5xl sm:text-[3.2rem] text-slate-800 dark:text-slate-400"
            />
            GitHub
          </a>
        </li>
        <li className="basis-[30%] sm:basis-auto">
          <a
            href="https://buymeacoffee.com/rogerweissenbrunner"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex flex-col flex-nowrap items-center gap-2 text-xs hover:text-slate-500"
          >
            <FontAwesomeIcon
              icon={faCoffee}
              className="social-icon text-5xl sm:text-[3.2rem] text-slate-800 dark:text-slate-400"
            />
            {tHome('coffee')}
          </a>
        </li>
      </ul>
    </div>
  )
}
