import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { modules } from '@/lib/modules-data';

export const metadata: Metadata = {
  title: "Mindset Modules - LockdIn",
};

export default function LessonsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Mindset Modules</h1>
        <p className="text-muted-foreground">The 10 modules to forge a refined mindset.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Link href={`/lessons/${module.id}`} key={module.id}>
            <Card className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Module {module.id}</p>
                        <CardTitle>{module.title}</CardTitle>
                    </div>
                    {module.completed && <CheckCircle className="h-6 w-6 text-green-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Click to start lesson.</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
