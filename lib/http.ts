import { AuthToken } from "@/features/auth/auth-service";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorData {
  statusCode: number;
  messageCode: string;
  message: string;
}

export class ApiError extends Error {
  statusCode: number;
  messageCode: string;

  constructor(statusCode: number, messageCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.messageCode = messageCode;
    this.name = "ApiError";
  }
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/* ------------------------------------------------------------------ */
/*  Token storage (module-level, works on both client & server)        */
/* ------------------------------------------------------------------ */

let _accessToken: AuthToken | null = null;

export const setAccessToken = (token: AuthToken | null): void => {
  _accessToken = token;
};

export const getAccessToken = (): AuthToken | null => _accessToken;

export const clearAccessToken = (): void => {
  _accessToken = null;
};

/* ------------------------------------------------------------------ */
/*  Axios instance                                                     */
/* ------------------------------------------------------------------ */

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true, // required to send refresh-token cookie
  headers: {
    "Content-Type": "application/json",
  },
});

/* ------------------------------------------------------------------ */
/*  Request interceptor – attach access token                          */
/* ------------------------------------------------------------------ */

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.set("Authorization", `Bearer ${token.token}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ------------------------------------------------------------------ */
/*  Response interceptor – auto refresh token on 401                   */
/* ------------------------------------------------------------------ */

let isRefreshing = false;
let refreshSubscribers: Array<(token: AuthToken) => void> = [];

const onRefreshed = (token: AuthToken): void => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (cb: (token: AuthToken) => void): void => {
  refreshSubscribers.push(cb);
};

const refreshAccessToken = async (): Promise<AuthToken> => {
  const response = await axios.post<ApiResponse<{ accessToken: AuthToken }>>(
    `${BASE_URL}/auth/refresh-token`,
    {},
    { withCredentials: true },
  );

  const newToken = response.data.data.accessToken;
  setAccessToken(newToken);
  return newToken;
};

http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => response,
  async (error: AxiosError<ApiErrorData>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If not 401 or no config, reject immediately
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(normalizeError(error));
    }

    // Prevent infinite loop if refresh itself fails
    if (originalRequest._retry) {
      clearAccessToken();
      return Promise.reject(normalizeError(error));
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // Wait for the ongoing refresh, then retry
      return new Promise((resolve) => {
        addRefreshSubscriber((token: AuthToken) => {
          if (originalRequest.headers) {
            originalRequest.headers.set("Authorization", `Bearer ${token.token}`);
          }
          resolve(http(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      onRefreshed(newToken);

      if (originalRequest.headers) {
        originalRequest.headers.set("Authorization", `Bearer ${newToken.token}`);
      }

      console.log(originalRequest.headers)

      return http(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      return Promise.reject(
        normalizeError(refreshError as AxiosError<ApiErrorData>),
      );
    } finally {
      isRefreshing = false;
    }
  },
);

/* ------------------------------------------------------------------ */
/*  Error normalizer                                                   */
/* ------------------------------------------------------------------ */

function normalizeError(error: AxiosError<ApiErrorData>): ApiError {
  if (error.response?.data) {
    const { statusCode, messageCode, message } = error.response.data;
    return new ApiError(statusCode, messageCode, message);
  }

  return new ApiError(
    error.response?.status || 500,
    "NETWORK_ERROR",
    error.message || "An unexpected network error occurred.",
  );
}

/* ------------------------------------------------------------------ */
/*  Typed helpers                                                      */
/* ------------------------------------------------------------------ */

export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await http.get<ApiResponse<T>>(url, config);
    return response.data.data;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await http.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await http.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await http.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  },
};

/* ------------------------------------------------------------------ */
/*  Re-exports                                                         */
/* ------------------------------------------------------------------ */

export { http };
export default http;
