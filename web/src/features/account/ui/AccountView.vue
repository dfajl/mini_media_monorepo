<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { UiButton } from '@/ui-kit'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const { user } = storeToRefs(auth)

async function toLogin() {
  await router.push({ name: 'login' })
}

async function logout() {
  auth.logout()
  await toLogin()
}

function formatDate(value: string | null | undefined) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}
</script>

<template>
  <main class="account-page">
    <section class="account-card">
      <header class="account-header">
        <div>
          <p class="account-caption">Mini Media</p>
          <h1>Account</h1>
          <p class="account-subtitle">Your profile data fetched from the backend.</p>
        </div>

        <div class="account-actions">
          <UiButton variant="ghost" @click="toLogin">Back to login</UiButton>
          <UiButton variant="secondary" @click="logout">Log out</UiButton>
        </div>
      </header>

      <div v-if="!user" class="account-empty">
        <p class="account-empty__title">No user data yet</p>
        <p class="account-empty__text">
          Sign in or sign up first — then we’ll show your profile details here.
        </p>
        <UiButton full-width @click="toLogin">Go to login</UiButton>
      </div>

      <div v-else class="account-grid">
        <div class="account-field">
          <div class="account-field__label">ID</div>
          <div class="account-field__value mono">{{ user.id }}</div>
        </div>

        <div class="account-field">
          <div class="account-field__label">Email</div>
          <div class="account-field__value">{{ user.email }}</div>
        </div>

        <div class="account-field">
          <div class="account-field__label">Name</div>
          <div class="account-field__value">{{ user.name ?? '—' }}</div>
        </div>

        <div class="account-field">
          <div class="account-field__label">Surname</div>
          <div class="account-field__value">{{ user.surname ?? '—' }}</div>
        </div>

        <div class="account-field">
          <div class="account-field__label">Birth date</div>
          <div class="account-field__value">{{ formatDate(user.birthDate) }}</div>
        </div>

        <div class="account-field">
          <div class="account-field__label">Created at</div>
          <div class="account-field__value">{{ formatDate(user.createdAt) }}</div>
        </div>

        <div class="account-field">
          <div class="account-field__label">Last login at</div>
          <div class="account-field__value">{{ formatDate(user.lastLoginAt) }}</div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.account-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(180deg, #f3f6ff 0%, #f9fafb 45%, #ffffff 100%);
}

.account-card {
  width: min(100%, 760px);
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 10px 35px rgba(15, 23, 42, 0.08);
}

.account-caption {
  margin: 0 0 6px;
  color: #4f46e5;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.account-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

h1 {
  margin: 0;
  color: #111827;
  font-size: 1.65rem;
}

.account-subtitle {
  margin: 8px 0 0;
  color: #6b7280;
}

.account-actions {
  display: inline-flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.account-empty {
  margin-top: 10px;
  padding: 18px;
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  background: #f8fafc;
}

.account-empty__title {
  margin: 0 0 6px;
  font-weight: 700;
  color: #0f172a;
}

.account-empty__text {
  margin: 0 0 14px;
  color: #475569;
}

.account-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.account-field {
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
}

.account-field__label {
  font-size: 0.82rem;
  color: #64748b;
  margin-bottom: 6px;
}

.account-field__value {
  color: #0f172a;
  font-weight: 600;
  word-break: break-word;
}

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  font-weight: 600;
}

@media (max-width: 640px) {
  .account-header {
    flex-direction: column;
  }

  .account-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .account-grid {
    grid-template-columns: 1fr;
  }
}
</style>

