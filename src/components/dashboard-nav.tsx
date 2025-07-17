
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Lock, Newspaper, Target, BrainCircuit, Users, Handshake, ShieldCheck, Cog } from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Newspaper },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/lessons", label: "Mindset Modules", icon: BrainCircuit },
  { href: "/communities", label: "Communities", icon: Users },
  { href: "/service-events", label: "Service Events", icon: Handshake },
  { href: "/leader-dashboard", label: "Organization", icon: ShieldCheck },
];

const secondaryMenuItems = [
    { href: "/settings", label: "Settings", icon: Cog },
]

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="!flex-row items-center">
        <Lock className="h-6 w-6 text-accent" />
        <span className="text-lg font-semibold">LOCKDIn</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label, side: "right", align: "center" }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4 !p-4 group-data-[collapsible=icon]:items-center">
        <div className="text-center text-accent font-bold uppercase tracking-widest group-data-[collapsible=icon]:hidden">
            "nothing in life worth having comes easy"
        </div>
         <SidebarMenu>
          {secondaryMenuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label, side: "right", align: "center" }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
