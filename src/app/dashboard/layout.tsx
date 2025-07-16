import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardNav } from "@/components/dashboard-nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <DashboardNav />
        <SidebarInset>
            <DashboardHeader />
            <main className="p-4 sm:p-6 lg:p-8">
              {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
