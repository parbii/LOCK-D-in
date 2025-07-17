import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardNav } from "@/components/dashboard-nav";
import { GoalsProvider } from "@/context/goals-context";
import { ModulesProvider } from "@/lib/modules-data.tsx";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ModulesProvider>
      <GoalsProvider>
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
      </GoalsProvider>
    </ModulesProvider>
  );
}
