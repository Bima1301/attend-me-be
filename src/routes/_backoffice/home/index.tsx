import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_backoffice/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_backoffice/home/"!</div>
}
