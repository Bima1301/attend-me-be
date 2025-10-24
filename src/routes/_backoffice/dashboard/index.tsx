import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '@/components/pages/backoffice/dashboard/containers/DashboardPage'

export const Route = createFileRoute('/_backoffice/dashboard/')({
  component: DashboardPage,
})
