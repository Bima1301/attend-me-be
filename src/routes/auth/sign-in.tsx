import { createFileRoute, redirect } from '@tanstack/react-router'
import SignInPage from '@/components/pages/backoffice/auth/sign-in/containers/SignInPage'

export const Route = createFileRoute('/auth/sign-in')({
  beforeLoad: ({ context: { isAuthenticated } }) => {
    if (isAuthenticated) {
      throw redirect({ to: '/', replace: true })
    }
  },
  component: SignInPage,
})
