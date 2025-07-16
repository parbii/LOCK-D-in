
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Heart, MessageCircle, MoreHorizontal, Send, Bookmark, Smile, Target, Flame } from "lucide-react";
import { useGoals } from "@/context/goals-context";
import { Checkbox } from "@/components/ui/checkbox";

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

function DailyHabitsTracker() {
    const { activeGoals, checkedHabits, handleHabitCheck, getTodaysDate } = useGoals();
    
    // Flatten habits from all goals
    const allHabits = activeGoals.flatMap(goal => 
        goal.habits.map(habit => ({ ...habit, goalId: goal.id, goalName: goal.name, goalCompletedToday: goal.lastCompleted === getTodaysDate() }))
    );

    if (allHabits.length === 0) {
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
                    <div key={goal.id}>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">{goal.name}</h4>
                            {goal.streak > 0 && (
                                <div className="flex items-center gap-1.5 text-orange-500 font-semibold text-sm">
                                    <Flame className="h-4 w-4" />
                                    <span>{goal.streak} day streak!</span>
                                </div>
                             )}
                        </div>
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


export default function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto">
        <DailyHabitsTracker />
      <div className="space-y-6">
        {/* Create Post Card */}
        <Card>
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="profile avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Input placeholder="What's on your mind?" className="flex-1" />
            <Button>Post</Button>
          </CardContent>
        </Card>

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
