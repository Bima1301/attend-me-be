import type { QueryClient } from '@tanstack/react-query'


import type {
  ResetPasswordValue,
  SignInRequestValue,
  TProfileResponse,
  TSignInResponse
} from './types'
import type { ServiceMutationOptionType, ServiceQueryOptionType } from '@/types/service'
import type { TResponse } from '@/types/response'
import { AUTH_ACCESS_TOKEN_STORAGE_KEY, api, getError } from '@/lib/axios'


export const AUTH_QUERY_KEY = (key?: string | Record<string, any>) =>
  ['profile', key] as const

const PROFILE_STORAGE_KEY = '__app-profile-data'

const getProfile = (): ServiceQueryOptionType<TProfileResponse | null> => ({
  queryKey: AUTH_QUERY_KEY(),
  queryFn: async () => {
    try {
      const response =
        await api.get<TResponse<TProfileResponse>>('/users/current')

      const profile = response.data.content
      if (!profile) {
        throw new Error('Profile not found')
      }

      // Simpan profile ke localStorage untuk offline access
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))

      return response.data.content
    } catch (e) {
      const error = getError(e)

      if (error.message === 'Unauthorized' ) {
        localStorage.removeItem(AUTH_ACCESS_TOKEN_STORAGE_KEY)
        localStorage.removeItem(PROFILE_STORAGE_KEY)
        return null
      }

      // Jika network error atau offline, coba ambil dari localStorage
      // Service worker akan menangani caching, tapi ini sebagai fallback
      const token = localStorage.getItem(AUTH_ACCESS_TOKEN_STORAGE_KEY)
      const cachedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)

      if (token && cachedProfile) {
        try {
          return JSON.parse(cachedProfile) as TProfileResponse
        } catch {
          // Jika parsing gagal, hapus cache yang corrupt
          localStorage.removeItem(PROFILE_STORAGE_KEY)
        }
      }

      return null
    }
  },
  // Menggunakan staleTime yang lebih lama untuk offline support
  staleTime: 5 * 60 * 1000, // 5 menit
  // Retry dengan exponential backoff untuk network errors
  retry: (failureCount, error: any) => {
    // Jangan retry jika 401 (unauthorized)
    if (error?.status === 401) return false
    // Retry maksimal 3 kali untuk network errors
    return failureCount < 3
  },
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
})

const signIn = (
  queryClient: QueryClient
): ServiceMutationOptionType<TResponse<TSignInResponse>, SignInRequestValue> => ({
  mutationFn: async reqBody => {
    try {
      const response = await api.post<TResponse<TSignInResponse>>('/users/login', reqBody)
      const token = response.data.content?.token

      localStorage.setItem(AUTH_ACCESS_TOKEN_STORAGE_KEY, token!)

      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY() })

      return response.data
    } catch (error) {
      throw getError(error)
    }
  }
})

const signOut = (
  queryClient: QueryClient
): ServiceMutationOptionType<unknown, void> => ({
  mutationFn: async () => {
    try {
      await api.delete('/users/logout', {})

      localStorage.removeItem(AUTH_ACCESS_TOKEN_STORAGE_KEY)
      localStorage.removeItem(PROFILE_STORAGE_KEY)

      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY() })
    } catch (error) {
      // Bahkan jika logout gagal di server, tetap hapus data lokal
      localStorage.removeItem(AUTH_ACCESS_TOKEN_STORAGE_KEY)
      localStorage.removeItem(PROFILE_STORAGE_KEY)
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY() })

      throw getError(error)
    }
  }
})

const resetPasswordMail = (): ServiceMutationOptionType<
  unknown,
  { email: string }
> => ({
  mutationFn: async ({ email }) => {
    try {
      const response = await api.post('/users/password/reset', { email })

      return response.data
    } catch (error) {
      throw getError(error)
    }
  }
})

const resetPassword = (): ServiceMutationOptionType<
  TResponse<{ message: null }>,
  ResetPasswordValue
> => ({
  mutationFn: async (data: ResetPasswordValue) => {
    try {
      const response = await api.post<
        TResponse<{ message: null }>
      >('/users/password/confirm', {
        ...data
      })
      return response.data
    } catch (error) {
      throw getError(error)
    }
  }
})

export const auth = {
  getProfile,
  signIn,
  signOut,
  resetPasswordMail,
  resetPassword
}
