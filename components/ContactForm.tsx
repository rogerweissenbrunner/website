'use client'

import { useEffect, useState } from 'react'
import Captcha, { generateCaptcha } from './Captcha'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contact')
  const [captcha, setCaptcha] = useState<ReturnType<
    typeof generateCaptcha
  > | null>(null)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setCaptcha(generateCaptcha())
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)

    if ((formData.get('answer') as string)?.trim()) {
      setStatus('success')
      return
    }

    if (!captcha) {
      setStatus('error')
      setErrorMessage(t('genericError'))
      return
    }

    const userCaptcha = (formData.get('captcha') as string)?.trim()
    if (userCaptcha !== captcha.answer) {
      setStatus('error')
      setErrorMessage(t('captchaError'))
      setCaptcha(generateCaptcha())
      return
    }

    setStatus('submitting')

    try {
      const params = new URLSearchParams()
      formData.forEach((value, key) => params.append(key, value.toString()))
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      })

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`)
      }

      setStatus('success')
      form.reset()
      setCaptcha(generateCaptcha())
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : t('genericError'))
    }
  }

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800 p-8 rounded-xl flex flex-col flex-nowrap gap-8">
      {status === 'success' && (
        <p
          className="text-green-700 dark:text-green-300 font-medium"
          role="status"
        >
          {t('success')}
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-700 dark:text-red-300 font-medium" role="alert">
          {errorMessage}
        </p>
      )}
      <form
        className="font-mono flex flex-col gap-6"
        name="contact-form"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="answer"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact-form" />
        <input
          name="answer"
          tabIndex={-1}
          autoComplete="off"
          hidden
          aria-hidden="true"
          className="hidden"
        />
        <label className="font-sans flex flex-col gap-2 font-medium">
          {t('nameLabel')}
          <input
            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded border border-slate-800 dark:border-slate-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-600"
            name="name"
            type="text"
            required
          />
        </label>
        <label className="font-sans flex flex-col gap-2 font-medium">
          {t('emailLabel')}
          <input
            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded border border-slate-800 dark:border-slate-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-600"
            name="email"
            type="email"
            required
          />
        </label>
        <label className="font-sans flex flex-col gap-2 font-medium">
          {t('messageLabel')}
          <textarea
            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded border border-slate-800 dark:border-slate-700 p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-600"
            name="message"
            required
          />
        </label>
        {captcha ? <Captcha captcha={captcha} /> : null}
        <button
          type="submit"
          className="bg-slate-800 text-white rounded px-6 py-2 font-bold hover:bg-slate-800 outline-none focus:outline-none disabled:opacity-60"
          disabled={status === 'submitting' || !captcha}
        >
          {status === 'submitting' ? (
            t('submitBusy')
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} className="md:mr-2" />
              {t('submitIdle')}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
