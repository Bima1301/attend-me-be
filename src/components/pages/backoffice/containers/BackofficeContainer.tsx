import { Outlet } from '@tanstack/react-router'
import { SiteHeader } from '../dashboard/section/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/pages/backoffice/dashboard/section/app-sidebar'



export default function BackofficeContainer() {
  // const getPageTitle = () => {
  //   if (routerState === "/") {
  //     return "Dashboard";
  //   }

  //   const firstSegment = routerState.split("/").filter(Boolean)[0];
  //   const fullPath = "/" + firstSegment;

  //   const mainItem = sidebarItems.find(item => item.href === routerState);
  //   if (mainItem) {
  //     return mainItem.label;
  //   }

  //   for (const item of sidebarItems) {
  //     if (item.children) {
  //       const matchingChild = item.children.find(child =>
  //         child.href === fullPath || routerState.startsWith(child.href + '/')
  //       );

  //       if (matchingChild) {
  //         return matchingChild.label;
  //       }
  //     }
  //   }

  //   const lastSegment = routerState.split("/").filter(Boolean).pop() || "";
  //   return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  // };

  return (
    <SidebarProvider
    style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }
  >
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <Outlet/>
    </SidebarInset>
  </SidebarProvider>
  )
}
