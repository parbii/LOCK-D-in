
"use client";

import React from 'react';
import { useGoals } from "@/context/goals-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Globe } from "lucide-react";
import { ProfileStats } from '@/components/profile-stats';


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
            
            <ProfileStats goals={activeGoals} postsCount={totalPosts} />

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
