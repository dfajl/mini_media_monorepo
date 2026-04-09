import { reactive, ref } from 'vue';
import { ApiError, login } from '@/shared/api';

export type AuthMode = 'signIn' | 'signUp';

export type LoginForm = {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export function useLogin() {
  const mode = ref<AuthMode>('signIn');

  const form = reactive<LoginForm>({
    fullName: '',
    birthDate: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const loading = ref(false);
  const notice = ref('');
  const errorMessage = ref('');

  async function submit() {
    loading.value = true;
    notice.value = '';
    errorMessage.value = '';

    try {
      if (mode.value === 'signUp') {
        // Эндпоинта регистрации пока нет — оставляем UI-режим,
        // чтобы позже просто подключить API.
        notice.value = `Account creation is not implemented yet. (fullName="${form.fullName}", birthDate="${form.birthDate}")`;
        return;
      }

      const result = await login({
        email: form.email,
        password: form.password,
      });
      notice.value = `Logged in as ${result.user.name}`;
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = 'Unexpected error';
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    mode,
    form,
    loading,
    notice,
    errorMessage,
    submit,
  };
}
