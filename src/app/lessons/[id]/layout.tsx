import AppLayout from "../../dashboard/layout";
import type { ReactNode } from "react";

export default function LessonDetailLayout({ children }: { children: ReactNode }) {
    return <AppLayout>{children}</AppLayout>
}
