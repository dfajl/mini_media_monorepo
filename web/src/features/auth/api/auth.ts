import { apiClient } from '@/core/api-client';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: 'Bearer';
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export function login(payload: LoginRequest) {
  return apiClient.post<LoginResponse>('/auth/login', payload);
}

export type SignUpRequest = {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  user: {
    id: string;
    email: string;
    name: string | null;
    surname: string | null;
  };
};

export function signUp(payload: SignUpRequest) {
  return apiClient.post<SignUpResponse>('/auth/sign-up', payload);
}
