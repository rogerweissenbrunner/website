import { useTranslations } from 'next-intl'

export function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  return { question: `${a} + ${b} = ?`, answer: String(a + b) }
}

export type CaptchaValue = { question: string; answer: string }

export default function Captcha({ captcha }: { captcha: CaptchaValue }) {
  const t = useTranslations('contact')

  return (
    <label className="font-sans flex flex-col gap-2 font-medium">
      {captcha.question}
      <input
        className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded border border-slate-800 dark:border-slate-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-600"
        name="captcha"
        type="text"
        placeholder={t('captchaPlaceholder')}
        required
      />
    </label>
  )
}
