export const AUTH_LOGIN_SUCCESS_EVENT = 'auth.login.success';

export type AuthLoginSuccessEvent = {
  name: string | null | undefined;
  surname: string | null | undefined;
  at: string;
  userId: string;
  email: string;
};
