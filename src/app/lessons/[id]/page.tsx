
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileText, Film, Lightbulb, MessageSquare, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { modules } from "@/lib/modules-data";


export function generateStaticParams() {
    return modules.map(m => ({ id: m.id.toString() }));
}


function LessonClientPage({ module }: { module: (typeof modules)[0] }) {
  if (!module) {
    return <div>Module not found</div>;
  }

  return (
    <div>
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
        </Link>
      <div className="mb-6">
        <p className="text-base font-semibold text-accent">Module {module.id}</p>
        <h1 className="text-4xl font-bold">{module.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{module.theme}</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-accent"/> Introduction</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90">
                    <p>This is where the introductory text for the "{module.title}" module will go. It will set the stage for the core concepts and learning objectives, explaining why this theme is crucial for personal and professional development. It aims to engage the reader and prepare them for the content ahead.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Film className="h-5 w-5 text-accent"/> Video Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video w-full rounded-lg overflow-hidden border bg-muted">
                       <Image src="https://placehold.co/1280x720.png" alt="Video thumbnail" width={1280} height={720} className="w-full h-full object-cover" data-ai-hint="presentation screen" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-accent"/> Core Concepts</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90 space-y-4">
                     <h4>Understanding the Principle</h4>
                    <p>Here, we will dive deep into the main principle of "{module.title}". This section will break down the complex ideas into digestible parts, using examples and stories to illustrate the points. The goal is to provide a solid theoretical foundation.</p>
                    
                    <h4>Practical Application</h4>
                    <p>This part will focus on how to apply the concepts in real-life situations. It will offer actionable steps, exercises, and frameworks that users can immediately implement to see tangible results in their daily routines and long-term goals.</p>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent"/> Key Takeaways</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0"/>
                            <span>A concise summary of the first major point.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0"/>
                            <span>An essential insight or action item from the lesson.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0"/>
                            <span>The third most important concept to remember.</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-accent" /> Your Notes</CardTitle>
                <CardDescription>Jot down your thoughts and reflections.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="What are your key reflections from this chapter?" rows={6} />
                    <Button className="mt-4 w-full">Save Notes</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}


export default function LessonPage({ params }: { params: { id: string } }) {
  const module = modules.find(m => m.id.toString() === params.id);
  
  // This extracts the theme for the specific module based on its ID
  const lessonModule = modules.find(m => m.id.toString() === params.id) || { theme: "Default Theme" };

  if (!module) {
    return <div>Module not found</div>;
  }
  
  return <LessonClientPage module={{...module, theme: lessonModule.theme}} />;
}
