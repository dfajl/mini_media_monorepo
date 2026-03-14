<script setup lang="ts">
import { UiButton, UiCheckbox, UiInput, UiLoader } from '@/ui-kit';
import { useLogin } from '@/features/auth/model/useLogin';

const { form, loading, notice, errorMessage, submit } = useLogin();
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <p class="auth-caption">Mini Media</p>
      <h1>Welcome back</h1>
      <p class="auth-subtitle">Sign in to continue to your dashboard.</p>

      <form class="auth-form" @submit.prevent="submit">
        <UiInput
          v-model="form.email"
          label="Email"
          placeholder="you@example.com"
          autocomplete="email"
        />

        <UiInput
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
        />

        <UiCheckbox v-model="form.rememberMe" label="Remember me" />

        <UiButton type="submit" :loading="loading" full-width>
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </UiButton>

        <div v-if="loading" class="loading-state">
          <UiLoader size="sm" label="Authorizing user" />
          <span>Authorizing...</span>
        </div>

        <p v-if="notice" class="notice">{{ notice }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(180deg, #f3f6ff 0%, #f9fafb 45%, #ffffff 100%);
}

.auth-card {
  width: min(100%, 420px);
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 10px 35px rgba(15, 23, 42, 0.08);
}

.auth-caption {
  margin: 0 0 6px;
  color: #4f46e5;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #111827;
  font-size: 1.65rem;
}

.auth-subtitle {
  margin: 8px 0 20px;
  color: #6b7280;
}

.auth-hint {
  margin: -8px 0 16px;
  color: #4b5563;
  font-size: 0.85rem;
}

.auth-form {
  display: grid;
  gap: 14px;
}

.loading-state {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-size: 0.9rem;
}

.notice {
  margin: 2px 0 0;
  color: #0f766e;
  font-size: 0.9rem;
}

.error {
  margin: 2px 0 0;
  color: #dc2626;
  font-size: 0.9rem;
}
</style>
