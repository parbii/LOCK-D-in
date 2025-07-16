import AppLayout from "../dashboard/layout";
import type { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return <AppLayout>{children}</AppLayout>
}
