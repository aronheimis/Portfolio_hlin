'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-sans tracking-widest uppercase text-parchment-600">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs font-sans text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full bg-transparent border-b border-parchment-300 focus:border-parchment-900 outline-none py-2.5 font-sans text-sm text-parchment-900 placeholder:text-parchment-400 transition-colors duration-300'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [serverError, setServerError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // honeypot
  })

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Nafn er nauðsynlegt.'
    if (!form.email.trim()) {
      errs.email = 'Netfang er nauðsynlegt.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Ógilt netfang.'
    }
    if (!form.message.trim()) errs.message = 'Skilaboð eru nauðsynleg.'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setState('loading')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error ?? 'Villa kom upp. Reyndu aftur.')
        setState('error')
        return
      }

      setState('success')
    } catch {
      setServerError('Villa við tengingu. Reyndu aftur.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="font-serif text-3xl font-light text-parchment-900">
          Þakka þér!
        </p>
        <p className="font-sans text-sm text-parchment-700 leading-relaxed max-w-sm mx-auto">
          Skilaboðin þín hafa borist. Hlín svarar þér eins fljótt og auðið er.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Field label="Nafn *" error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nafn þitt"
          className={inputClass}
          autoComplete="name"
        />
      </Field>

      <Field label="Netfang *" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="netfang@domain.is"
          className={inputClass}
          autoComplete="email"
        />
      </Field>

      <Field label="Efni">
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Brúðkaup, portrettmyndir, ..."
          className={inputClass}
        />
      </Field>

      <Field label="Skilaboð *" error={errors.message}>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Lýstu verkefninu þínu..."
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {serverError && (
        <p className="text-xs font-sans text-red-500" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="inline-flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-parchment-700 hover:text-parchment-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
      >
        {state === 'loading' ? 'Sendi...' : 'Senda skilaboð'}
        {state !== 'loading' && <span aria-hidden>→</span>}
      </button>
    </form>
  )
}
