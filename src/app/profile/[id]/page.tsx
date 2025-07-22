
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Target, Flame, FileText, Lock, Heart, MessageCircle, MoreHorizontal, Send, Bookmark, Smile } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { type Goal } from '@/context/goals-context';
import { ProfileStats } from '@/components/profile-stats';

const friendsData = [
    {
        id: 1, name: "Sarah Lee", username: "@sarahlee", avatar: "https://placehold.co/100x100.png", aiHint: "woman smiling", bio: "Fitness enthusiast and marathon runner. Always pushing my limits.",
        publicGoals: [
            { id: 101, name: "Run a 5k", progress: 100, streak: 21, isPublic: true, lastCompleted: "2023-10-26", description: "", habits: [] },
            { id: 102, name: "Read 12 books this year", progress: 75, streak: 3, isPublic: true, lastCompleted: "2023-10-26", description: "", habits: [] },
        ],
        posts: [
             { id: 1, user: { name: "Sarah Lee", avatar: "https://placehold.co/40x40.png", aiHint: "woman smiling" }, content: "Crushed my goal of running a 5k this morning! Felt amazing. #nevergiveup #goals", image: "https://placehold.co/600x400.png", imageAiHint: "running marathon", likes: 124, comments: 12, time: "2h ago" },
        ]
    },
    {
        id: 2, name: "David Kim", username: "@davidkim", avatar: "https://placehold.co/100x100.png", aiHint: "man portrait", bio: "Tech entrepreneur and mindfulness advocate. Building cool things and staying present.",
        publicGoals: [
             { id: 201, name: "Meditate daily", progress: 100, streak: 45, isPublic: true, lastCompleted: "2023-10-26", description: "", habits: [] },
        ],
        posts: [
            { id: 2, user: { name: "David Kim", avatar: "https://placehold.co/40x40.png", aiHint: "man portrait" }, content: "7-day streak on my 'Daily Devotion' habit! Feeling more focused and centered than ever. 🙏", likes: 89, comments: 5, time: "4h ago" },
        ]
    },
    {
        id: 3, name: "Emily Chen", username: "@emilychen", avatar: "https://placehold.co/100x100.png", aiHint: "woman hiking", bio: "Artist and nature lover. Finding inspiration in the wild.",
        publicGoals: [],
        posts: []
    }
];

export default function FriendProfilePage() {
    const params = useParams();
    const friendId = params.id;
    const friend = friendsData.find(f => f.id.toString() === friendId);

    if (!friend) {
        return <div className="text-center py-10">Friend not found.</div>
    }

    // Cast publicGoals to Goal[] to satisfy ProfileStats component
    const publicGoals: Goal[] = friend.publicGoals.map(g => ({...g, habits: [], description: ''}));

    return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-6">
            <Avatar className="w-24 h-24 text-4xl">
              <AvatarImage src={friend.avatar} data-ai-hint={friend.aiHint} />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">{friend.name}</h1>
                <p className="text-muted-foreground">{friend.username}</p>
            </div>
            <p className="max-w-prose text-sm text-foreground/80">
              {friend.bio}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>Public Profile</span>
            </div>
            <ProfileStats goals={publicGoals} postsCount={friend.posts.length} userId={friend.id}/>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>{friend.name}'s Public Goals</CardTitle>
            <CardDescription>Goals they are sharing with the community.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {friend.publicGoals.length > 0 ? (
                friend.publicGoals.map((goal: any) => (
                    <div key={goal.id}>
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold">{goal.name}</h4>
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                {goal.streak > 0 && <Flame className="h-5 w-5 text-orange-500" />}
                                {goal.progress >= 100 ? (
                                    <Lock className="h-5 w-5 text-accent" />
                                ) : (
                                    <span>{Math.floor(goal.progress)}%</span>
                                )}
                            </div>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                    </div>
                ))
            ) : (
                <div className="text-center text-muted-foreground py-8">
                    <p>nothing to see here</p>
                </div>
            )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">{friend.name}'s Feed</h2>
        {friend.posts.length > 0 ? friend.posts.map(post => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} data-ai-hint={post.user.aiHint} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              {post.image && (
                 <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                    <Image src={post.image} alt="Post image" layout="fill" className="object-cover" data-ai-hint={post.imageAiHint}/>
                 </div>
              )}
            </CardContent>
            <div className="px-6 pb-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><MessageCircle className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><Send className="h-5 w-5" /></Button>
                    </div>
                    <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5" /></Button>
                </div>
                <p className="text-sm font-semibold">{post.likes} likes</p>
                <p className="text-sm text-muted-foreground cursor-pointer hover:underline">View all {post.comments} comments</p>
                <div className="flex items-center gap-2 mt-2">
                    <Input placeholder="Add a comment..." className="h-9 flex-1" />
                    <Button variant="ghost" size="icon"><Smile className="h-5 w-5"/></Button>
                    <Button variant="ghost" size="icon"><Send className="h-5 w-5"/></Button>
                </div>
            </div>
          </Card>
        )) : (
            <Card>
                <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                        <p>{friend.name} hasn't posted anything yet.</p>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
    );
}
