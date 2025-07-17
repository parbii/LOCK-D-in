
"use client";

import React from 'react';
import { useGoals } from "@/context/goals-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Globe, BrainCircuit } from "lucide-react";
import { ProfileStats } from '@/components/profile-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReflections } from '@/context/reflections-context';
import Link from 'next/link';
import { format } from 'date-fns';

function ReflectionsList() {
    const { reflections } = useReflections();

    if (reflections.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-8">
                <p>You hav*n't sav*d any r*fl*ctions y*t.</p>
                <Button asChild className="mt-4">
                    <Link href="/lessons">
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        Go to Minds*t Modul*s
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reflections.map((reflection, index) => (
                <Card key={index} className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg">{reflection.lessonTitle}</CardTitle>
                        <CardDescription>
                            From Modul* {reflection.moduleId}: {reflection.moduleTitle} &middot; Sav*d on {format(new Date(reflection.date), "PPP")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{reflection.reflectionText}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}


export default function ProfilePage() {
  const { activeGoals } = useGoals();
  const totalPosts = 0; // Placeholder

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 text-4xl">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="profile avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">My Profil*</h1>
                <p className="text-muted-foreground">@m*</p>
            </div>
            <p className="max-w-prose text-sm text-foreground/80">
              This is a sampl* bio. I'm driv*n by purpos* and committ*d to growth. This is my p*rsonal spac* to track my journ*y.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>My Public Profil*</span>
            </div>
            
            <ProfileStats goals={activeGoals} postsCount={totalPosts} />

          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="reflections">Minds*t R*fl*ctions</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
            <Card>
                <CardContent className="pt-6">
                <div className="text-center text-muted-foreground py-8">
                    <p>You hav*n't post*d anything y*t.</p>
                    <Button className="mt-4">Cr*at* Your First Post</Button>
                </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="reflections">
            <Card>
                <CardContent className="pt-6">
                   <ReflectionsList />
                </CardContent>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  );
}
