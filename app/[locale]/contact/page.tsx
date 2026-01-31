import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {ContactForm} from '@/components/ContactForm'
import {getLanguageAlternates} from '@/i18n/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'meta.contact'})

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/contact',
      languages: getLanguageAlternates('/contact')
    }
  }
}

export default async function ContactPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  return (
    <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto items-center justify-center gap-6 mt-8">
      <h1 className="font-serif w-full text-2xl font-black">{t('title')}</h1>
      <ContactForm />
    </div>
  )
}
