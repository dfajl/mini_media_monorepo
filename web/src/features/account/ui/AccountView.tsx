import { useNavigate } from 'react-router'
import { UiButton } from '@/ui-kit'
import { logout, selectUser } from '@/stores/auth'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import './AccountView.css'

function formatDate(value: string | null | undefined) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(
    date,
  )
}

export default function AccountView() {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const toLogin = () => {
    void navigate('/login')
  }
  const fields = user
    ? [
        ['ID', user.id],
        ['Email', user.email],
        ['Name', user.name ?? '—'],
        ['Surname', user.surname ?? '—'],
        ['Birth date', formatDate(user.birthDate)],
        ['Created at', formatDate(user.createdAt)],
        ['Last login at', formatDate(user.lastLoginAt)],
      ]
    : []
  return (
    <main className="account-page">
      <section className="account-card">
        <header className="account-header">
          <div>
            <p className="account-caption">Mini Media</p>
            <h1>Account</h1>
            <p className="account-subtitle">Your profile data fetched from the backend.</p>
          </div>
          <div className="account-actions">
            <UiButton variant="ghost" onClick={toLogin}>
              Back to login
            </UiButton>
            <UiButton
              variant="secondary"
              onClick={() => {
                dispatch(logout())
                toLogin()
              }}
            >
              Log out
            </UiButton>
          </div>
        </header>
        {!user ? (
          <div className="account-empty">
            <p className="account-empty__title">No user data yet</p>
            <p className="account-empty__text">
              Sign in or sign up first — then we’ll show your profile details here.
            </p>
            <UiButton fullWidth onClick={toLogin}>
              Go to login
            </UiButton>
          </div>
        ) : (
          <div className="account-grid">
            {fields.map(([label, value]) => (
              <div className="account-field" key={label}>
                <div className="account-field__label">{label}</div>
                <div className={`account-field__value ${label === 'ID' ? 'mono' : ''}`}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
