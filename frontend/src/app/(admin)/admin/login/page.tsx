'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { login, setToken, getToken, removeToken, getMe } from '@/lib/admin-api'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm]         = useState({ email: '', password: '' })
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [checking, setChecking] = useState(true)

  // Validate existing token — if invalid, clear it and show login form
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setChecking(false)
      return
    }

    // Token exists — verify it's still valid with the API
    getMe()
      .then(res => {
        if (res.is_admin) {
          // Valid admin token — redirect to dashboard
          router.replace('/admin/dashboard')
        } else {
          // Valid token but not admin — clear and show login
          removeToken()
          setChecking(false)
        }
      })
      .catch(() => {
        // Token is invalid/expired — clear it and show login form
        removeToken()
        setChecking(false)
      })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login(form.email, form.password)

      if (res.token) {
        setToken(res.token)
        if (res.is_admin) {
          router.push('/admin/dashboard')
        } else {
          removeToken()
          setError('You do not have admin access.')
        }
      } else {
        if (res.errors?.email) {
          setError(res.errors.email[0])
        } else {
          setError(res.message ?? 'Invalid credentials. Please try again.')
        }
      }
    } catch {
      setError('Unable to connect. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-sage border-t-transparent
                          rounded-full animate-spin" />
          <p className="text-xs text-text-muted">Verifying session…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12
                          bg-sage rounded-full mb-3 shadow-md">
            <Leaf size={22} className="text-white" />
          </div>
          <h1 className="font-display text-2xl text-bark">Feiwellhub</h1>
          <p className="text-sm text-text-muted mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-bark/10 rounded-2xl p-8
                        shadow-[0_4px_24px_rgba(61,43,31,0.07)]">
          <h2 className="font-display text-2xl text-bark mb-6">Sign in</h2>

          {error && (
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50
                            border border-red-200 text-red-600 text-sm mb-5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input id="email" type="email" autoComplete="email"
                className="form-input"
                placeholder="admin@feiwellhub.co.ke"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required />
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative">
                <input id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="form-input pr-10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required />
                <button type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted
                             hover:text-bark transition-colors"
                  onClick={() => setShowPw(s => !s)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full justify-center mt-2 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-cream border-t-transparent
                                   rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Feiwellhub Naturals © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}