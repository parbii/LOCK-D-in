
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Activity, Target, Shield, MessageSquare, ThumbsUp, Lock } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { modules } from "@/lib/modules-data";
import Link from "next/link";

function OrganizationGate() {
  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader className="text-center">
        <Lock className="mx-auto h-12 w-12 text-accent mb-4" />
        <CardTitle>Unlock the Organization Dashboard</CardTitle>
        <CardDescription>To access this page, you must first complete all 10 Mindset Modules.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">This ensures all leaders share a foundational understanding.</p>
        <Button asChild>
          <Link href="/lessons">Go to Mindset Modules</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function LeaderDashboardPage() {
  const allModulesCompleted = modules.every(module => module.completed);

  if (!allModulesCompleted) {
    return <OrganizationGate />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Organization</h1>
        <p className="text-lg text-muted-foreground mt-2">Manage engagement and track progress for your school or university.</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-accent"/> Student Engagement</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90">
                    <p>This is where student engagement metrics will be displayed. It will include charts and data visualizations to track progress and goal completion across your student body.</p>
                     <div className="aspect-video w-full rounded-lg overflow-hidden border bg-muted mt-4">
                       <Image src="https://placehold.co/1280x720.png" alt="Performance chart" width={1280} height={720} className="w-full h-full object-cover" data-ai-hint="data chart graph" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-accent"/> Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">A live feed of important events and achievements from your students.</p>
                    {/* Placeholder for activity feed items */}
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                            <ThumbsUp className="h-5 w-5 text-green-500" />
                            <p className="text-sm"><span className="font-semibold">Sarah Lee</span> just completed the 'Run a 5k' goal!</p>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                            <Target className="h-5 w-5 text-accent" />
                            <p className="text-sm"><span className="font-semibold">David Kim</span> created a new goal: 'Meditate daily'.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-accent"/> Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Student Members</span>
                            <span className="font-bold text-lg">1,284</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Student Streaks</span>
                            <span className="font-bold text-lg">312</span>
                        </li>
                         <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Weekly Goals Completed</span>
                            <span className="font-bold text-lg">48</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-accent" /> Send Announcement</CardTitle>
                <CardDescription>Broadcast a message to your students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Type your announcement here..." rows={6} />
                    <Button className="mt-4 w-full">Send to Students</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
