import { getTranslations } from 'next-intl/server'

export async function Footer() {
  const t = await getTranslations('footer')

  return (
    <footer className="w-full max-w-5xl mx-auto p-4">
      <p className="font-sans text-xs text-center">{t('copyright')}</p>
    </footer>
  )
}
