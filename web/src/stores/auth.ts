import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type AuthUser = {
  id: string
  email: string
  name: string | null
  surname: string | null
  birthDate: string | null
  createdAt: string
  lastLoginAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const tokenType = ref<'Bearer' | null>(null)
  const user = ref<AuthUser | null>(null)

  const isAuthenticated = computed(() => Boolean(accessToken.value && tokenType.value))

  function setAuth(payload: { accessToken?: string; tokenType?: 'Bearer'; user: AuthUser }) {
    accessToken.value = payload.accessToken ?? null
    tokenType.value = payload.tokenType ?? null
    user.value = payload.user
  }

  function logout() {
    accessToken.value = null
    tokenType.value = null
    user.value = null
  }

  return {
    accessToken,
    tokenType,
    user,
    isAuthenticated,
    setAuth,
    logout,
  }
})

