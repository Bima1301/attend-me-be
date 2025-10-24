import { default as _axios } from "axios";
import type { AxiosError } from "axios";
import { env } from "@/env";

export const AUTH_ACCESS_TOKEN_STORAGE_KEY = '__app-access-token'

export const api = _axios.create({
  baseURL: env.VITE_BASE_API_URL,
});

api.interceptors.request.use(opts => {
  const token = localStorage.getItem(AUTH_ACCESS_TOKEN_STORAGE_KEY)

  if (token) {
    opts.headers.set('Authorization', `Bearer ${token}`)
  }

  return opts
})
export const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
};

export const getError = (error: AxiosError | unknown) => {
  if (_axios.isAxiosError(error)) {
    return {
      content: error.response?.data?.content || null,
      message: error.response?.data?.message || "Something went wrong",
      errors: error.response?.data?.errors || [],
    };
  }

  return { message: "Something went wrong" };
};
