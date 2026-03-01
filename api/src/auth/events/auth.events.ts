export const AUTH_LOGIN_SUCCESS_EVENT = 'auth.login.success';

export type AuthLoginSuccessEvent = {
  userId: string;
  email: string;
  at: string;
};
