<script setup lang="ts">
import {
  UiButton,
  UiCheckbox,
  UiInput,
  UiLoader,
  UiSegmentedControl,
} from '@/ui-kit';
import { useLogin } from '@/features/auth/model/useLogin';
import { createAutoHeightTransitionHooks } from '@/shared/utils/autoHeightTransition';

const { mode, form, loading, notice, errorMessage, submit } = useLogin();
const transition = createAutoHeightTransitionHooks();

const authModeOptions = [
  { value: 'signIn', label: 'Sign in' },
  { value: 'signUp', label: 'Sign up' },
] as const;
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <p class="auth-caption">Mini Media</p>
      <div class="auth-header">
        <h1>{{ mode === 'signIn' ? 'Welcome back' : 'Create account' }}</h1>

        <UiSegmentedControl v-model="mode" :options="authModeOptions" />
      </div>

      <p class="auth-subtitle">
        {{
          mode === 'signIn'
            ? 'Sign in to continue to your dashboard.'
            : 'Create a new account to get started.'
        }}
      </p>

      <form class="auth-form" @submit.prevent="submit">
        <Transition
          @before-enter="transition.onBeforeEnter"
          @enter="transition.onEnter"
          @after-enter="transition.onAfterEnter"
          @before-leave="transition.onBeforeLeave"
          @leave="transition.onLeave"
          @after-leave="transition.onAfterLeave"
        >
          <div v-if="mode === 'signUp'" class="auth-signup-extra">
            <UiInput
              v-model="form.fullName"
              label="Full name"
              placeholder="Иванов Иван Иванович"
              autocomplete="name"
            />

            <div class="auth-field">
              <label class="auth-field__label" for="birthDate">Date of birth</label>
              <input
                id="birthDate"
                v-model="form.birthDate"
                class="auth-field__input"
                type="date"
                autocomplete="bday"
              />
            </div>
          </div>
        </Transition>

        <UiInput
          v-model="form.email"
          :label="mode === 'signIn' ? 'Email' : 'Login (email)'"
          placeholder="you@example.com"
        />

        <UiInput
          v-model="form.password"
          :label="mode === 'signIn' ? 'Password' : 'Create password'"
          type="password"
          :placeholder="mode === 'signIn' ? 'Enter your password' : 'Choose a password'"
        />

        <UiCheckbox
          v-if="mode === 'signIn'"
          v-model="form.rememberMe"
          label="Remember me"
        />

        <UiButton type="submit" :loading="loading" full-width>
          {{
            loading
              ? mode === 'signIn'
                ? 'Signing in...'
                : 'Creating account...'
              : mode === 'signIn'
                ? 'Sign in'
                : 'Sign up'
          }}
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

.auth-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
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

.auth-signup-extra {
  display: grid;
  gap: 14px;
}

.auth-field {
  display: grid;
  gap: 6px;
}

.auth-field__label {
  color: #0f172a;
  font-size: 0.9rem;
  font-weight: 600;
}

.auth-field__input {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 12px;
  font: inherit;
  outline: none;
}

.auth-field__input:focus {
  border-color: rgba(79, 70, 229, 0.4);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
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

