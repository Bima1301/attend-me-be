import { createFileRoute, redirect } from '@tanstack/react-router'

import BackofficeContainer from '@/components/pages/backoffice/containers/BackofficeContainer'

export const Route = createFileRoute('/_backoffice')({
  beforeLoad: ({ context: { isAuthenticated } }) => {
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/sign-in',
        replace: true,
        search: { error: 'unauthenticated' }
      })
    }
  },
  component: BackofficeContainer
})
