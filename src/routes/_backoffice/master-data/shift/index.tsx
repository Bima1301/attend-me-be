import { createFileRoute } from '@tanstack/react-router'
import ShiftPage from '@/components/pages/backoffice/master-data/shift/container'

export const Route = createFileRoute('/_backoffice/master-data/shift/')({
  component: ShiftPage,
})
