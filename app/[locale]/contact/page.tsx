import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/ContactForm'
import { getBasicPageMetadata } from '@/i18n/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return getBasicPageMetadata({
    locale,
    namespace: 'meta.contact',
    pathname: '/contact'
  })
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  return (
    <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto items-center justify-center gap-6 mt-8">
      <h1 className="font-serif w-full text-2xl font-black">{t('title')}</h1>
      <ContactForm />
    </div>
  )
}
