import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { ApiError } from '@/core/api-client'
import { login, signUp } from '@/features/auth/api/auth'
import { setAuth } from '@/stores/auth'
import { useAppDispatch } from '@/stores/hooks'
import { validateAuthForm } from '../utils/validateAuthForm'

export type AuthMode = 'signIn' | 'signUp'
export type LoginForm = {
  fullName: string
  birthDate: string
  email: string
  password: string
  rememberMe: boolean
}
export type LoginFormErrors = Partial<Record<keyof Omit<LoginForm, 'rememberMe'>, string>>

export function useLogin() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [mode, setMode] = useState<AuthMode>('signIn')
  const [form, setForm] = useState<LoginForm>({
    fullName: '',
    birthDate: '',
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const submitting = useRef(false)

  function updateField<K extends keyof LoginForm>(field: K, value: LoginForm[K]) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  async function submit() {
    if (submitting.current) return
    setErrorMessage('')
    const nextErrors = validateAuthForm(mode, form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    submitting.current = true
    setLoading(true)
    try {
      if (mode === 'signUp') {
        const result = await signUp({
          fullName: form.fullName,
          birthDate: form.birthDate,
          email: form.email,
          password: form.password,
        })
        dispatch(setAuth({ user: result.user }))
        updateField('password', '')
      } else {
        dispatch(setAuth(await login({ email: form.email, password: form.password })))
      }
      await navigate('/account')
    } catch (error: unknown) {
      setErrorMessage(error instanceof ApiError ? error.message : 'Unexpected error')
    } finally {
      submitting.current = false
      setLoading(false)
    }
  }
  return { mode, setMode, form, updateField, errors, loading, errorMessage, submit }
}
