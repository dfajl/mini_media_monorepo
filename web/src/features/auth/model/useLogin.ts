import { reactive, ref } from 'vue';
import { ApiError, login } from '@/shared/api';

export type LoginForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function useLogin() {
  const form = reactive<LoginForm>({
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
    form,
    loading,
    notice,
    errorMessage,
    submit,
  };
}
