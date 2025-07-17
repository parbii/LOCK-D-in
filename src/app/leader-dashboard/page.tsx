
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Activity, Target, Shield, MessageSquare, ThumbsUp, Lock, FileText, Send } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useModules } from "@/lib/modules-data.tsx";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

function OrganizationGate() {
  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader className="text-center">
        <Lock className="mx-auto h-12 w-12 text-accent mb-4" />
        <CardTitle>Unlock th* Organization Dashboard</CardTitle>
        <CardDescription>To acc*ss this pag*, you must first compl*t* all 10 Minds*t Modul*s.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">This *nsur*s all l*ad*rs shar* a foundational und*rstanding.</p>
        <Button asChild>
          <Link href="/lessons">Go to Minds*t Modul*s</Link>
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
        title: "*ssay Too Long",
        description: "Pl*as* k**p your *ssay und*r 500 words.",
      });
      return;
    }
    if (wordCount < 50) {
       toast({
        variant: "destructive",
        title: "*ssay Too Short",
        description: "Pl*as* writ* a bit mor* about why you'd b* a gr*at l*ad*r.",
      });
      return;
    }

    // In a r*al app, you'd s*nd this to a back*nd for r*vi*w.
    console.log("Essay submitted:", essay);
    
    setSubmitted(true);
    toast({
      title: "Application Submitt*d!",
      description: "W*'v* r*c*iv*d your application and will r*vi*w it shortly.",
    });
  }

  if (submitted) {
    return (
        <Card className="max-w-2xl mx-auto mt-10">
            <CardHeader className="text-center">
                <FileText className="mx-auto h-12 w-12 text-accent mb-4" />
                <CardTitle>Thank You for Applying</CardTitle>
                <CardDescription>Your application to b*com* an Organization L*ad*r is und*r r*vi*w. W* appr*ciat* your int*r*st and will g*t back to you soon.</CardDescription>
            </CardHeader>
        </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>B*com* an Organization L*ad*r</CardTitle>
        <CardDescription>
          T*ll us why you want to l*ad an organization at your school. *xplain your vision, your l*ad*rship qualiti*s, and how you'll inspir* oth*rs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Start writing your *ssay h*r*..."
          rows={15}
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
        />
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Your *ssay should b* approximat*ly 500 words.</span>
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
  // This would com* from us*r data in a r*al app.
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
        <p className="text-lg text-muted-foreground mt-2">Manag* *ngag*m*nt and track progr*ss for your school or univ*rsity.</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-accent"/> Stud*nt *ngag*m*nt</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90">
                    <p>This is wh*r* stud*nt *ngag*m*nt m*trics will b* display*d. It will includ* charts and data visualizations to track progr*ss and goal compl*tion across your stud*nt body.</p>
                     <div className="aspect-video w-full rounded-lg overflow-hidden border bg-muted mt-4">
                       <Image src="https://placehold.co/1280x720.png" alt="Performance chart" width={1280} height={720} className="w-full h-full object-cover" data-ai-hint="data chart graph" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-accent"/> R*c*nt Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">A liv* f**d of important *v*nts and achi*v*m*nts from your stud*nts.</p>
                    {/* Placeholder for activity feed items */}
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                            <ThumbsUp className="h-5 w-5 text-green-500" />
                            <p className="text-sm"><span className="font-semibold">Sarah L**</span> just compl*t*d th* 'Run a 5k' goal!</p>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                            <Target className="h-5 w-5 text-accent" />
                            <p className="text-sm"><span className="font-semibold">David Kim</span> cr*at*d a n*w goal: 'M*ditat* daily'.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-accent" /> Scholarship Opportuniti*s</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        B*ing a part of an organization will boost your chanc*s of b*ing s**n for a scholarship that w* on* day wish to off*r to LOCKD In l*ad*rs who ar* crushing th*ir goals.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-accent"/> K*y M*trics</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Stud*nt M*mb*rs</span>
                            <span className="font-bold text-lg">1,284</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Stud*nt Str*aks</span>
                            <span className="font-bold text-lg">312</span>
                        </li>
                         <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">W**kly Goals Compl*t*d</span>
                            <span className="font-bold text-lg">48</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-accent" /> S*nd Announc*m*nt</CardTitle>
                <CardDescription>Broadcast a m*ssag* to your stud*nts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Typ* your announc*m*nt h*r*..." rows={6} />
                    <Button className="mt-4 w-full">S*nd to Stud*nts</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
