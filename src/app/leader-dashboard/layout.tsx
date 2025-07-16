import AppLayout from "../dashboard/layout";
import type { ReactNode } from "react";

export default function LeaderDashboardLayout({ children }: { children: ReactNode }) {
    return <AppLayout>{children}</AppLayout>
}
