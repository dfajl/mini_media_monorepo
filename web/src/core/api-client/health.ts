import { apiClient } from './http';

export type HealthResponse = {
  status: string;
  time: string;
};

export function getHealth() {
  return apiClient.get<HealthResponse>('/health');
}
