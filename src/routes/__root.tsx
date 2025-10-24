import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'
import type { TProfileResponse } from '@/api/auth/types'
import { api } from '@/api'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context: { queryClient } }) => {
    // Cek apakah ada token di localStorage
    const token = localStorage.getItem('__app-access-token')

    if (!token) {
      return {
        profile: null,
        isAuthenticated: false
      }
    }

    try {
      const profile = await queryClient.fetchQuery(api.auth.getProfile())
      await queryClient.ensureQueryData(api.auth.getProfile())

      return {
        profile,
        isAuthenticated: !!profile
      }
    } catch {
      // Jika terjadi error (termasuk network error), coba ambil dari cache
      const cachedProfile = localStorage.getItem('__app-profile-data')

      if (cachedProfile) {
        try {
          const profile = JSON.parse(cachedProfile)
          return {
            profile: profile as TProfileResponse,
            isAuthenticated: true
          }
        } catch {
          // Jika parsing gagal, hapus cache yang corrupt
          localStorage.removeItem('__app-profile-data')
        }
      }

      return {
        profile: null as TProfileResponse | null,
        isAuthenticated: false
      }
    }
  },
  component: () => (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
})
