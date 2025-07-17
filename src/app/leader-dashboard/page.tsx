
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Activity, Target, Shield, MessageSquare, ThumbsUp, Lock, FileText, Send } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useModules } from "@/lib/modules-data";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

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

function OrganizationApplication() {
  const [essay, setEssay] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = () => {
    if (wordCount > 500) {
      toast({
        variant: "destructive",
        title: "Essay Too Long",
        description: "Please keep your essay under 500 words.",
      });
      return;
    }
    if (wordCount < 50) {
       toast({
        variant: "destructive",
        title: "Essay Too Short",
        description: "Please write a bit more about why you'd be a great leader.",
      });
      return;
    }

    // In a real app, you'd send this to a backend for review.
    console.log("Essay submitted:", essay);
    
    setSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We've received your application and will review it shortly.",
    });
  }

  if (submitted) {
    return (
        <Card className="max-w-2xl mx-auto mt-10">
            <CardHeader className="text-center">
                <FileText className="mx-auto h-12 w-12 text-accent mb-4" />
                <CardTitle>Thank You for Applying</CardTitle>
                <CardDescription>Your application to become an Organization Leader is under review. We appreciate your interest and will get back to you soon.</CardDescription>
            </CardHeader>
        </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Become an Organization Leader</CardTitle>
        <CardDescription>
          Tell us why you want to lead an organization at your school. Explain your vision, your leadership qualities, and how you'll inspire others.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Start writing your essay here..."
          rows={15}
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
        />
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Your essay should be approximately 500 words.</span>
          <span className={wordCount > 500 ? "font-bold text-destructive" : ""}>{wordCount} / 500 words</span>
        </div>
        <Button onClick={handleSubmit} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Submit Application
        </Button>
      </CardContent>
    </Card>
  )
}


export default function LeaderDashboardPage() {
  const { modules } = useModules();
  const allModulesCompleted = modules.every(module => module.completed);
  // This would come from user data in a real app.
  const [isLeader, setIsLeader] = useState(false); 

  if (!allModulesCompleted) {
    return <OrganizationGate />;
  }
  
  if (!isLeader) {
    return <OrganizationApplication />;
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
                    <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-accent" /> Scholarship Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Being a part of an organization will boost your chances of being seen for a scholarship that we one day wish to offer to LOCKD In leaders who are crushing their goals.
                    </p>
                </CardContent>
            </Card>

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
