import { apiClient } from './http';

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
