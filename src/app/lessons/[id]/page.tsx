import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ExternalLink, Paperclip } from "lucide-react";
import Link from "next/link";
import { Textarea } from '@/components/ui/textarea';

const modules = [
  { id: 1, title: "Kp God First", theme: "Spiritual alignment, trust, daily devotion." },
  { id: 2, title: "Know Your Why", theme: "Intentionality, '5 Whys' technique, deep inquiry." },
  { id: 3, title: "Ballislif", theme: "Teamwork, 'Threes Over Twos', Intensity, Dictate Your Pace." },
  { id: 4, title: "Th Art of What If", theme: "Directing imagination, risk tolerance, scenario planning." },
  { id: 5, title: "Linkdin", theme: "Professionalism, building professional brand, networking." },
  { id: 6, title: "Consistncy/Disciplin", theme: "Showing up, putting in work, symbiotic relationship." },
  { id: 7, title: "Authnticity", theme: "Living your truth, supportive people/spaces, overcoming imposter syndrome." },
  { id: 8, title: "Togthrness", theme: "Collective effort, respect, overcoming greed, community building." },
  { id: 9, title: "Prfction", theme: "Unattainable ideal, infinite growth, embracing mistakes/feedback." },
  { id: 10, title: "Whats Your Purpos", theme: "Synthesis, passion alignment, life's calling, impact." },
];

export async function generateStaticParams() {
    return modules.map(m => ({ id: m.id.toString() }));
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const module = modules.find(m => m.id.toString() === params.id);

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
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5"/> Lesson Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <p>Rich text, embedded videos, and audio content for this module will be displayed here.</p>
                <Button variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Slides
                    </a>
                </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Assignment</CardTitle>
                <CardDescription>Submit your response for this module's assignment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea placeholder="Type your response here..." rows={8} />
                    <div className="flex justify-between items-center">
                        <Button variant="outline"><Paperclip className="mr-2 h-4 w-4"/> Attach File</Button>
                        <Button>Submit Assignment</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Module completion status and overall curriculum progress will be shown here.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
