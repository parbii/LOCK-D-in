import AppLayout from "../dashboard/layout";
import type { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return <AppLayout>{children}</AppLayout>
}
