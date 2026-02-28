const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL is not set. Add it to your web environment file.');
}

type PrimitiveBody = string | FormData | URLSearchParams | Blob | ArrayBuffer;

export type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: PrimitiveBody | Record<string, unknown>;
};

export class ApiError extends Error {
  status: number;
  details?: unknown;

  static readonly ERROR_NAME = 'ApiError';

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function isJsonResponse(response: Response): boolean {
  return response.headers.
    get('content-type')?.
    includes('application/json') ?? false;
}

function hasPrimitiveBody(body: unknown): body is PrimitiveBody {
  return (
    typeof body === 'string' ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  );
}

async function parseResponse(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  if (isJsonResponse(response)) {
    return response.json();
  }

  return response.text();
}

function resolveErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  if (payload && typeof payload === 'object' && 'message' in payload) {
    const message = (payload as { message?: unknown }).message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return fallback;
}

class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { body, headers, ...restOptions } = options;
    const requestHeaders = new Headers(headers);
    const preparedBody =
      body === undefined || hasPrimitiveBody(body) ? body : JSON.stringify(body);

    if (body !== undefined && !hasPrimitiveBody(body) && !requestHeaders.has('Content-Type')) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        ...restOptions,
        headers: requestHeaders,
        body: preparedBody,
      });

      const payload = await parseResponse(response);

      if (!response.ok) {
        throw new ApiError(
          resolveErrorMessage(payload, `Request failed with status ${response.status}`),
          response.status,
          payload,
        );
      }

      return payload as T;
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new ApiError(error.message || 'Network request failed', 0, error);
      }

      throw new ApiError('Unexpected network error', 0, error);
    }
  }

  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  post<T>(path: string, body?: RequestOptions['body'], options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'POST', body });
  }

  put<T>(path: string, body?: RequestOptions['body'], options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PUT', body });
  }

  patch<T>(path: string, body?: RequestOptions['body'], options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PATCH', body });
  }

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
