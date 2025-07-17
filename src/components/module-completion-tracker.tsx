
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useModules } from "@/lib/modules-data.tsx";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import React from "react";

export function ModuleCompletionTracker() {
    const { modules } = useModules();
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const completedModules = modules.filter(m => m.completed).length;
    const totalModules = modules.length;
    const completionPercentage = (completedModules / totalModules) * 100;
    
    if (completionPercentage >= 100) {
        return null;
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-6 w-6 text-accent" />
                    Minds*t Modul* Progr*ss
                </CardTitle>
                <CardDescription>
                    You've completed {completedModules} out of {totalModules} modules. Keep going!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={completionPercentage} className="h-2" />
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href="/lessons">
                        Continue Learning
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
