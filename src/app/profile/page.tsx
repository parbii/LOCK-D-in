
"use client";

import React from 'react';
import { useGoals } from "@/context/goals-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, Globe, Target, Flame, FileText } from "lucide-react";

function ProfileStats() {
    const { activeGoals } = useGoals();
  
    const totalGoals = activeGoals.length;
    const totalStreaks = activeGoals.reduce((sum, goal) => sum + goal.streak, 0);
    const totalPosts = 0; // Placeholder until posts are implemented
  
    const stats = [
      { name: "Goals", value: totalGoals, icon: Target },
      { name: "Streaks", value: totalStreaks, icon: Flame },
      { name: "Posts", value: totalPosts, icon: FileText },
    ];
  
    return (
        <div className="flex justify-around rounded-lg bg-muted/50 p-4 w-full max-w-sm">
        {stats.map((stat, index) => (
          <React.Fragment key={stat.name}>
            <div className="flex flex-col items-center gap-1 text-center">
              <stat.icon className="h-6 w-6 text-muted-foreground" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.name}</p>
            </div>
            {index < stats.length - 1 && <Separator orientation="vertical" className="h-16" />}
          </React.Fragment>
        ))}
      </div>
    );
}


export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-4">
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
                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">@me</p>
            </div>
            <p className="max-w-prose text-sm text-foreground/80">
              This is a sample bio. I'm driven by purpose and committed to growth. This is my personal space to track my journey.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>My Public Profile</span>
            </div>
            
            <ProfileStats />

          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Posts</CardTitle>
          <CardDescription>Content you've shared with the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>You haven't posted anything yet.</p>
            <Button className="mt-4">Create Your First Post</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
