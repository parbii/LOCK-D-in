
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Heart, MessageCircle, MoreHorizontal, Send, Bookmark, Smile, Target, Flame, Lock, Calendar, MapPin, Users, Image as ImageIcon, X } from "lucide-react";
import { useGoals, type Goal } from "@/context/goals-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import Link from "next/link";
import { type ServiceEvent } from "../service-events/page";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ModuleCompletionTracker } from "@/components/module-completion-tracker";


// Mock data for feed posts
const posts = [
  {
    id: 1,
    user: {
      name: "Jane Doe",
      avatar: "https://placehold.co/40x40.png",
      aiHint: "woman smiling"
    },
    content: "Crushed my goal of running a 5k this morning! Felt amazing. #nevergiveup #goals",
    image: "https://placehold.co/600x400.png",
    imageAiHint: "running marathon",
    likes: 124,
    comments: 12,
    time: "2h ago"
  },
  {
    id: 2,
    user: {
      name: "John Smith",
      avatar: "https://placehold.co/40x40.png",
      aiHint: "man portrait"
    },
    content: "7-day streak on my 'Daily Devotion' habit! Feeling more focused and centered than ever. 🙏",
    likes: 89,
    comments: 5,
    time: "4h ago"
  },
    {
    id: 3,
    user: {
      name: "Alex Johnson",
      avatar: "https://placehold.co/40x40.png",
      aiHint: "person thinking"
    },
    content: "The 'Know Your Why' module was a game changer. Really digging deep into my motivations. Highly recommend!",
    likes: 210,
    comments: 23,
    time: "1d ago"
  }
];

function CreatePost() {
    const { activeGoals } = useGoals();
    const [postContent, setPostContent] = useState('');
    const [isGoalDialogOpen, setGoalDialogOpen] = useState(false);
    const [attachedGoal, setAttachedGoal] = useState<Goal | null>(null);

    const handleAttachGoal = (goal: Goal) => {
        setAttachedGoal(goal);
        setGoalDialogOpen(false);
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="profile avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Textarea 
                        placeholder="What's on your mind?" 
                        className="flex-1"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={3}
                    />
                </div>
                {attachedGoal && (
                    <div className="pl-14">
                        <Badge variant="secondary" className="flex items-center gap-2 max-w-max">
                            <Target className="h-3 w-3" />
                            <span>{attachedGoal.name}</span>
                            <button onClick={() => setAttachedGoal(null)} className="rounded-full hover:bg-muted -mr-1">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <div className="flex gap-2 text-muted-foreground">
                    <Button variant="ghost" size="icon" aria-label="Add Photo">
                        <ImageIcon className="h-5 w-5" />
                    </Button>
                     <Dialog open={isGoalDialogOpen} onOpenChange={setGoalDialogOpen}>
                        <DialogTrigger asChild>
                             <Button variant="ghost" size="icon" aria-label="Attach Goal">
                                <Target className="h-5 w-5" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Attach a Goal</DialogTitle>
                                <DialogDescription>Select one of your active goals to share in your post.</DialogDescription>
                            </DialogHeader>
                            <div className="max-h-80 overflow-y-auto py-4 space-y-2">
                                {activeGoals.map(goal => (
                                    <button 
                                        key={goal.id} 
                                        className="w-full text-left p-3 rounded-md hover:bg-muted flex items-start gap-3"
                                        onClick={() => handleAttachGoal(goal)}
                                    >
                                        <Target className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold">{goal.name}</p>
                                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                                        </div>
                                    </button>
                                ))}
                                {activeGoals.length === 0 && <p className="text-sm text-center text-muted-foreground py-4">You have no active goals to attach.</p>}
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" aria-label="Mention Streak">
                        <Flame className="h-5 w-5" />
                    </Button>
                 </div>
                <Button>Post</Button>
            </CardFooter>
        </Card>
    );
}

function DailyHabitsTracker() {
    const { activeGoals, checkedHabits, handleHabitCheck, getTodaysDate } = useGoals();
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || activeGoals.length === 0) {
        return null;
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-accent" />
                    Today's Habits
                </CardTitle>
                <CardDescription>Check off your habits for the day to build your streak.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {activeGoals.map(goal => (
                    <div key={goal.id} className="space-y-3">
                         <div>
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold">{goal.name}</h4>
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    {goal.streak > 0 && goal.lastCompleted === getTodaysDate() && <Flame className="h-5 w-5 text-orange-500" />}
                                    {goal.progress >= 100 ? (
                                        <Lock className="h-5 w-5 text-accent" />
                                    ) : (
                                        <span>{Math.floor(goal.progress)}%</span>
                                    )}
                                </div>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                        </div>

                        {goal.streak > 0 && (
                            <div className="flex items-center justify-end gap-1.5 text-orange-500 font-semibold text-sm">
                                <Flame className="h-4 w-4" />
                                <span>{goal.streak} day streak!</span>
                            </div>
                        )}
                        
                        <div className="space-y-3">
                            {goal.habits.map(habit => (
                                 <div key={habit.id} className="flex items-center space-x-3 rounded-md border p-3 bg-muted/20">
                                    <Checkbox
                                      id={`feed-habit-${habit.id}`}
                                      checked={checkedHabits[habit.id] || false}
                                      onCheckedChange={() => handleHabitCheck(habit.id, goal.id)}
                                      disabled={goal.lastCompleted === getTodaysDate()}
                                    />
                                    <div>
                                        <label
                                            htmlFor={`feed-habit-${habit.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {habit.text}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

function RsvpEvents() {
    const [rsvpdEvents, setRsvpdEvents] = useState<ServiceEvent[]>([]);
     const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            const storedEvents = localStorage.getItem('rsvpdEvents');
            if (storedEvents) {
                // Parse dates back to Date objects
                const parsedEvents = JSON.parse(storedEvents).map((e: ServiceEvent) => ({...e, date: new Date(e.date)}));
                setRsvpdEvents(parsedEvents);
            }
        }
    }, []);

    if (!isClient || rsvpdEvents.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            {rsvpdEvents.map(event => (
                 <Card key={event.id}>
                    <CardHeader>
                        <p className="text-sm text-muted-foreground">You RSVP'd to an upcoming event:</p>
                        <CardTitle>{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{format(event.date, "PPP")}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{event.attendees} going</span>
                        </div>
                         <Button asChild className="mt-4 w-full">
                            <Link href={`/service-events`}>View Event</Link>
                         </Button>
                    </CardContent>
                 </Card>
            ))}
        </div>
    );
}

export default function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto">
        <DailyHabitsTracker />
        <ModuleCompletionTracker />
        <RsvpEvents />
      <div className="space-y-6 mt-6">
        <CreatePost />

        {/* Feed Posts */}
        {posts.map(post => (
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
                    <Image src={post.image} alt="Post image" layout="fill" objectFit="cover" data-ai-hint={post.imageAiHint}/>
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
                    <Input placeholder="Add a comment..." className="h-9" />
                    <Button variant="ghost" size="icon"><Smile className="h-5 w-5"/></Button>
                </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
