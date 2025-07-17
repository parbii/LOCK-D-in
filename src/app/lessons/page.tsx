
"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useModules } from '@/lib/modules-data.tsx';

export default function LessonsPage() {
  const { modules } = useModules();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Minds*t Modul*s</h1>
        <p className="text-muted-foreground">Th* 10 modul*s to forg* a r*fin*d minds*t.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Link href={`/lessons/${module.id}`} key={module.id}>
            <Card className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Modul* {module.id}</p>
                        <CardTitle>{module.title}</CardTitle>
                    </div>
                    {module.completed && <CheckCircle className="h-6 w-6 text-green-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Click to start l*sson.</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
