
"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileText, Film, Lightbulb, MessageSquare, CheckCircle, Target, Star, Book, Edit, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useModules } from "@/lib/modules-data";
import { lessonContent, type Lesson, type QuizQuestion } from "@/lib/lesson-content";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

function LessonClientPage({ module, lesson }: { module: ReturnType<typeof useModules>['modules'][0], lesson: Lesson }) {
  const { completeModule, modules } = useModules();
  const { toast } = useToast();
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [shortAnswer, setShortAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleAnswerChange = (qIndex: number, value: string) => {
    setAnswers(prev => ({...prev, [qIndex]: value}));
  };

  const handleSubmit = () => {
    let isCorrect = true;
    if (lesson.assessment.type === 'quiz' && lesson.assessment.questions) {
        lesson.assessment.questions.forEach((q, index) => {
            const selectedOptionIndex = parseInt(answers[index] as string, 10);
            if (q.options[selectedOptionIndex] !== q.correct_answer) {
                isCorrect = false;
            }
        });
    }

    if(isCorrect) {
        completeModule(module.id);
        setSubmitted(true);
        toast({
            title: "Module Complete!",
            description: `Great job on finishing "${module.title}".`,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Not Quite",
            description: "Some answers were incorrect. Please review the material and try again.",
        });
    }
  };

  const handleShortAnswerSubmit = () => {
    // For open-ended questions, we can just mark it complete on submission.
    // In a real app, you might save this to a database for review.
    completeModule(module.id);
    setSubmitted(true);
    toast({
        title: "Module Complete!",
        description: `Great job on finishing "${module.title}".`,
    });
  }

  const nextModuleId = module.id < modules.length ? module.id + 1 : null;

  if (submitted || module.completed) {
    return (
        <div>
            <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Modules
            </Link>
            <Card className="text-center">
                <CardHeader>
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl">Module Complete!</CardTitle>
                    <CardDescription>You've successfully completed "{module.title}".</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Keep up the great work. Every step forward is a step toward refining your mindset.</p>
                </CardContent>
                <CardFooter className="flex-col sm:flex-row justify-center gap-4">
                     <Button variant="outline" asChild>
                        <Link href="/lessons">Back to All Modules</Link>
                    </Button>
                    {nextModuleId && (
                        <Button asChild>
                            <Link href={`/lessons/${nextModuleId}`}>
                                Next Module <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div>
      <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Modules
      </Link>
      <div className="mb-6">
        <p className="text-base font-semibold text-accent">{module.title}</p>
        <h1 className="text-4xl font-bold">{lesson.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <span>{lesson.duration_minutes} min lesson</span>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-accent"/> Objective</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">{lesson.objective}</p>
                </CardContent>
            </Card>

            {lesson.content_sections.map((section, index) => {
                switch (section.type) {
                    case 'introduction':
                        return (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-accent"/> {section.heading}</CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90 whitespace-pre-line">
                                    <p>{section.text}</p>
                                </CardContent>
                            </Card>
                        );
                    case 'scripture_focus':
                         return (
                            <Card key={index} className="bg-muted/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Book className="h-5 w-5 text-accent"/> {section.heading}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <blockquote className="border-l-4 border-accent pl-4 italic text-lg font-semibold">
                                        {section.verse}
                                    </blockquote>
                                    <p className="prose prose-sm md:prose-base max-w-none text-foreground/90 mt-4">{section.commentary}</p>
                                </CardContent>
                            </Card>
                        );
                    case 'teaching_point':
                        return (
                             <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent"/> {section.heading}</CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90 space-y-4">
                                    {section.points.map((point, pIndex) => (
                                        <div key={pIndex}>
                                            <h4 className="font-semibold">{point.sub_heading}</h4>
                                            <p>{point.text}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        );
                    case 'interactive_activity':
                        return (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Edit className="h-5 w-5 text-accent"/> {section.heading}</CardTitle>
                                    <CardDescription className="whitespace-pre-line">{section.prompt}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea placeholder="Write your reflection here..." rows={8}/>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Reflection</Button>
                                </CardFooter>
                            </Card>
                        );
                     case 'application_challenge':
                        return (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-accent"/> {section.heading}</CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-sm md:prose-base max-w-none text-foreground/90">
                                   <p>{section.challenge_details}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button>Accept Challenge</Button>
                                </CardFooter>
                            </Card>
                        )
                    default:
                        return null;
                }
            })}
        </div>
        <div className="space-y-8">
            {lesson.resources && lesson.resources.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-accent"/> Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {lesson.resources.map((resource, index) => (
                                <li key={index}>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline flex items-center gap-2">
                                        {resource.type === 'video' ? <Film className="h-4 w-4" /> : resource.type === 'article' ? <BookOpen className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                        {resource.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {lesson.assessment?.type === 'quiz' && lesson.assessment.questions && lesson.assessment.questions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Knowledge Check</CardTitle>
                        <CardDescription>Test your understanding of the key concepts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <RadioGroup onValueChange={(value) => {
                            const [qIndex] = value.split('-').map(Number);
                            handleAnswerChange(qIndex, value.split('-')[1]);
                        }}>
                            {lesson.assessment.questions.map((q, qIndex) => (
                                <div key={qIndex} className="space-y-3">
                                    <p className="font-semibold">{qIndex + 1}. {q.question_text}</p>
                                    <div className="space-y-2 pl-2">
                                    {q.options.map((option, oIndex) => (
                                        <div key={oIndex} className="flex items-center space-x-2">
                                            <RadioGroupItem value={`${qIndex}-${oIndex}`} id={`q${qIndex}-o${oIndex}`} />
                                            <Label htmlFor={`q${qIndex}-o${oIndex}`}>{option}</Label>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleSubmit}>Submit Answers</Button>
                    </CardFooter>
                </Card>
            )}
             {lesson.assessment?.type === 'short_answer' && lesson.assessment.question_text && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Knowledge Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold mb-2">{lesson.assessment.question_text}</p>
                        <Textarea placeholder="Your answer..." value={shortAnswer} onChange={(e) => setShortAnswer(e.target.value)} />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleShortAnswerSubmit}>Submit Answer</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}


export default function LessonPage({ params }: { params: { id: string } }) {
  const { modules } = useModules();
  const module = modules.find(m => m.id.toString() === params.id);
  const lessonModuleData = lessonContent.find(lc => lc.order.toString() === params.id);
  const lesson = lessonModuleData?.lessons[0];

  if (!module || !lesson) {
    return (
        <div className="p-8">
            <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Modules
            </Link>
            <Card>
                <CardHeader>
                    <CardTitle>Content Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>The content for this lesson is not available yet. Please check back later.</p>
                </CardContent>
            </Card>
        </div>
    );
  }
  
  return <LessonClientPage module={module} lesson={lesson} />;
}
