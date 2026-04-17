import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ApiError } from '@/core/api-client';
import { login, signUp } from '@/features/auth/api/auth';
import { useAuthStore } from '@/stores/auth';
import { validateAuthForm } from '../utils/validateAuthForm';

export type AuthMode = 'signIn' | 'signUp';

export type LoginForm = {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginFormErrors = Partial<
  Record<keyof Omit<LoginForm, 'rememberMe'>, string>
>;

export function useLogin() {
  const router = useRouter();
  const auth = useAuthStore();
  const mode = ref<AuthMode>('signIn');

  const form = reactive<LoginForm>({
    fullName: '',
    birthDate: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const errors = reactive<LoginFormErrors>({});

  const loading = ref(false);
  const notice = ref('');
  const errorMessage = ref('');

  function validate(): boolean {
    const nextErrors = validateAuthForm(mode.value, form);

    errors.fullName = nextErrors.fullName ?? '';
    errors.birthDate = nextErrors.birthDate ?? '';
    errors.email = nextErrors.email ?? '';
    errors.password = nextErrors.password ?? '';

    return Object.keys(nextErrors).length === 0;
  }

  async function submit() {
    notice.value = '';
    errorMessage.value = '';

    if (!validate()) {
      return;
    }

    loading.value = true;

    try {
      if (mode.value === 'signUp') {
        const result = await signUp({
          fullName: form.fullName,
          birthDate: form.birthDate,
          email: form.email,
          password: form.password,
        });

        auth.setAuth({ user: result.user });
        await router.push({ name: 'account' });
        form.password = '';
        return;
      }

      const result = await login({
        email: form.email,
        password: form.password,
      });

      auth.setAuth({
        accessToken: result.accessToken,
        tokenType: result.tokenType,
        user: result.user,
      });
      await router.push({ name: 'account' });
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
    errors,
    loading,
    notice,
    errorMessage,
    submit,
  };
}
