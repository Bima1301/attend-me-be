import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'
import { api } from '@/api'
import { delay } from '@/lib/utils'

export function useAuth() {
  const queryClient = useQueryClient()

  const { data: profile } = useSuspenseQuery({
    ...api.auth.getProfile(),
    refetchOnWindowFocus: false
  })

  const navigate = useNavigate()
  const searchParams = useSearch({ strict: false })
  const redirectUrl =
    new URLSearchParams(searchParams as Record<string, string>).get(
      'redirect_to'
    ) ?? '/dashboard'

  const {
    mutate: signIn,
    mutateAsync: _signInAsync,
    ...signInState
  } = useMutation({
    ...api.auth.signIn(queryClient),
    onMutate: () => {
      toast.loading('Sedang melakukan proses autentikasi...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Proses autentikasi berhasil. Mengarahkan ke aplikasi...')
      delay(500).then(() => navigate({ to: redirectUrl }))
    },
    onError: e => {
      toast.dismiss()
      toast.error(e.message)
    }
  })

  const {
    mutate: signOut,
    mutateAsync: _signOutAsync,
    ...signOutState
  } = useMutation({
    ...api.auth.signOut(queryClient),
    onMutate: () => {
      toast.loading('Logging out...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Logout berhasil.')
      delay(500).then(() =>
        navigate({ to: '/auth/sign-in', search: { error: undefined } })
      )
    },
    onError: e => {
      toast.dismiss()
      toast.error(e.message)
    }
  })

  return {
    profile,
    signIn,
    signInState,
    signOut,
    signOutState,
  }
}
