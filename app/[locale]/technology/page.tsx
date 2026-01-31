import type {Metadata} from 'next'
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {getLanguageAlternates} from '@/i18n/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'meta.technology'})

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/technology',
      languages: getLanguageAlternates('/technology')
    }
  }
}

export default async function TechnologyPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations('technology')

  return (
    <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto gap-8 mt-8">
      <h1 className="font-serif text-2xl font-black">{t('title')}</h1>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">
          {t('operatingSystems')}
        </h2>
        <ul className="font-mono list-disc list-inside text-sm">
          <li>
            <a
              href="https://ubuntu.com/server"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Ubuntu Server{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a
              href="https://elementary.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Elementary OS{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">
          {t('programmingLanguages')}
        </h2>
        <ul className="font-mono list-disc list-inside text-sm">
          <li>
            <a
              href="https://www.ruby-lang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Ruby{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Node.js{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              TypeScript{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">{t('frameworks')}</h2>
        <ul className="font-mono list-disc list-inside text-sm">
          <li>
            <a href="https://rubyonrails.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Ruby on Rails{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="font-bold">
              React{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Tailwind CSS{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://vite.dev/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Vite{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">{t('mobile')}</h2>
        <ul className="font-mono list-disc list-inside text-sm">
          <li>
            <a href="https://www.flutter.dev/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Flutter{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">{t('databases')}</h2>
        <ul className="font-mono list-disc list-inside text-sm">
          <li>
            <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              PostgreSQL{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" className="font-bold">
              MongoDB{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://redis.io/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Redis{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">{t('services')}</h2>
        <ul className="font-mono list-disc list-inside text-sm">
          <li>
            <a href="https://httpd.apache.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Apache HTTP Server{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://www.openssh.com/" target="_blank" rel="noopener noreferrer" className="font-bold">
              OpenSSH Server{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://www.postfix.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Postfix SMTP Server{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://dovecot.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Dovecot POP3/IMAP Server{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://memcached.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Memcached{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://www.rsyslog.com/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Rsyslog{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.thekelleys.org.uk/dnsmasq/doc.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              DNSmasq{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a
              href="https://uncomplicated-firewall.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Uncomplicated Firewall{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Docker{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl font-bold mb-2">{t('tools')}</h2>
        <ul className="font-mono list-disc list-inside text-sm">
          <li>
            <a
              href="https://gnome.org/projects/terminator/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Terminator{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://www.zsh.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Zsh{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://www.vim.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Vim{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Git{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://vscodium.com/" target="_blank" rel="noopener noreferrer" className="font-bold">
              VSCodium{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://meldmerge.org/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Meld{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
          <li>
            <a href="https://brave.com/" target="_blank" rel="noopener noreferrer" className="font-bold">
              Brave Browser{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="inline-block ml-2 opacity-50"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
