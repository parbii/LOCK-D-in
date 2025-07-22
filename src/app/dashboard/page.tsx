
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
import React, { useEffect, useState, useRef } from 'react';
import { format } from "date-fns";
import Link from "next/link";
import { type ServiceEvent } from "../service-events/page";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ModuleCompletionTracker } from "@/components/module-completion-tracker";
import { initialPosts, type Post, type Comment } from "@/lib/posts-data";
import { useToast } from "@/hooks/use-toast";


function CreatePost({ addPost }: { addPost: (post: Omit<Post, 'id' | 'user' | 'likes' | 'comments' | 'time'>) => void }) {
    const { activeGoals } = useGoals();
    const { toast } = useToast();
    const [postContent, setPostContent] = useState('');
    const [isGoalDialogOpen, setGoalDialogOpen] = useState(false);
    const [attachedGoal, setAttachedGoal] = useState<Goal | null>(null);
    const [attachedImage, setAttachedImage] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleAttachGoal = (goal: Goal) => {
        setAttachedGoal(goal);
        setGoalDialogOpen(false);
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleAddStreak = () => {
        if (activeGoals.length === 0) {
            toast({
                variant: "destructive",
                title: "No Activ* Str*aks",
                description: "You need an active goal with a streak to share it.",
            });
            return;
        }

        const longesTStreakGoal = activeGoals.reduce((prev, current) => (prev.streak > current.streak) ? prev : current);

        if (longesTStreakGoal.streak === 0) {
             toast({
                variant: "destructive",
                title: "No Activ* Str*aks",
                description: "Start completing daily habits to build a streak!",
            });
            return;
        }
        
        const streakText = `I'm on a ${longesTStreakGoal.streak}-day streak for my goal: "${longesTStreakGoal.name}"! 🔥`;
        setPostContent(prev => prev ? `${prev}\n${streakText}` : streakText);
    };

    const handlePost = () => {
        if (!postContent.trim() && !attachedImage) {
            toast({
                variant: "destructive",
                title: "Cannot cr*at* *mpty post",
                description: "Please add some content or an image.",
            });
            return;
        }

        let content = postContent;
        if (attachedGoal) {
            content = `Attached Goal: ${attachedGoal.name}\n\n${postContent}`;
        }
        
        addPost({
            content,
            image: attachedImage || undefined,
            imageAiHint: attachedImage ? 'user uploaded' : undefined,
            comments: [],
        });

        // Reset form
        setPostContent('');
        setAttachedGoal(null);
        setAttachedImage(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
         toast({
            title: "Post Cr*at*d!",
            description: "Your post is now live on your dashboard.",
        });
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
                <div className="pl-14 space-y-2">
                    {attachedGoal && (
                        <Badge variant="secondary" className="flex items-center gap-2 max-w-max">
                            <Target className="h-3 w-3" />
                            <span>{attachedGoal.name}</span>
                            <button onClick={() => setAttachedGoal(null)} className="rounded-full hover:bg-muted -mr-1">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                    {attachedImage && (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                            <Image src={attachedImage} alt="Post preview" layout="fill" className="object-cover" />
                             <Button
                                size="icon"
                                variant="destructive"
                                className="absolute top-2 right-2 h-7 w-7 rounded-full"
                                onClick={() => {
                                    setAttachedImage(null);
                                    if(imageInputRef.current) imageInputRef.current.value = "";
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <div className="flex gap-2 text-muted-foreground">
                    <input 
                        type="file" 
                        ref={imageInputRef} 
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                    />
                    <Button variant="ghost" size="icon" aria-label="Add Photo" onClick={() => imageInputRef.current?.click()}>
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
                    <Button variant="ghost" size="icon" aria-label="Mention Streak" onClick={handleAddStreak}>
                        <Flame className="h-5 w-5" />
                    </Button>
                 </div>
                <Button onClick={handlePost}>Post</Button>
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

function PostCard({ post, onUpdatePost }: { post: Post, onUpdatePost: (updatedPost: Post) => void }) {
    const [commentText, setCommentText] = useState("");
    const [isCommentsOpen, setCommentsOpen] = useState(false);

    const handleLike = () => {
        const updatedPost = {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
        onUpdatePost(updatedPost);
    };

    const handleAddComment = () => {
        if (!commentText.trim()) return;

        const newComment: Comment = {
            id: Date.now(),
            user: {
                name: "Current User",
                avatar: "https://placehold.co/40x40.png",
                aiHint: "profile avatar",
            },
            text: commentText,
            time: "Just now",
        };

        const updatedPost = {
            ...post,
            comments: [...post.comments, newComment],
        };
        onUpdatePost(updatedPost);
        setCommentText("");
    };

    return (
        <Card>
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
              <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
              {post.image && (
                 <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                    <Image src={post.image} alt="Post image" layout="fill" className="object-cover" data-ai-hint={post.imageAiHint}/>
                 </div>
              )}
            </CardContent>
            <div className="px-6 pb-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={handleLike}>
                            <Heart className={`h-5 w-5 ${post.liked ? 'text-red-500 fill-current' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setCommentsOpen(true)}>
                            <MessageCircle className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon"><Send className="h-5 w-5" /></Button>
                    </div>
                    <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5" /></Button>
                </div>
                <p className="text-sm font-semibold">{post.likes} likes</p>
                {post.comments.length > 0 && (
                    <p className="text-sm text-muted-foreground cursor-pointer hover:underline" onClick={() => setCommentsOpen(true)}>
                        View all {post.comments.length} comments
                    </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                    <Input 
                        placeholder="Add a comment..." 
                        className="h-9 flex-1" 
                        value={commentText} 
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <Button variant="ghost" size="icon" onClick={() => { /* Emoji picker functionality */ }}>
                        <Smile className="h-5 w-5"/>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleAddComment}>
                        <Send className="h-5 w-5"/>
                    </Button>
                </div>
            </div>
            <Dialog open={isCommentsOpen} onOpenChange={setCommentsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comments on {post.user.name}'s post</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 p-4">
                        {post.comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={comment.user.avatar} data-ai-hint={comment.user.aiHint} />
                                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted/50 rounded-lg px-3 py-2 flex-1">
                                    <div className="flex items-baseline justify-between">
                                        <p className="font-semibold text-sm">{comment.user.name}</p>
                                        <p className="text-xs text-muted-foreground">{comment.time}</p>
                                    </div>
                                    <p className="text-sm">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                         {post.comments.length === 0 && (
                            <p className="text-sm text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

export default function DashboardPage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedPosts = localStorage.getItem('userPosts');
            const parsedPosts = savedPosts ? JSON.parse(savedPosts) : initialPosts;
            // Ensure comments property is always an array
            const sanitizedPosts = parsedPosts.map((p: Post) => ({ ...p, comments: p.comments || [] }));
            setPosts(sanitizedPosts);
        }
    }, []);
    
    const updateAndSavePosts = (updatedPosts: Post[]) => {
        setPosts(updatedPosts);
        if (typeof window !== 'undefined') {
            localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
        }
    };

    const addPost = (newPostData: Omit<Post, 'id' | 'user' | 'likes' | 'comments' | 'time'>) => {
        const newPost: Post = {
            id: Date.now(),
            user: {
                name: "Current User", // Replace with actual user data
                avatar: "https://placehold.co/40x40.png",
                aiHint: "profile avatar"
            },
            ...newPostData,
            likes: 0,
            comments: [],
            time: "Just now"
        };
        const updatedPosts = [newPost, ...posts];
        updateAndSavePosts(updatedPosts);
    };

    const handleUpdatePost = (updatedPost: Post) => {
        const updatedPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
        updateAndSavePosts(updatedPosts);
    };

  return (
    <div className="max-w-2xl mx-auto">
        <DailyHabitsTracker />
        <ModuleCompletionTracker />
        <RsvpEvents />
      <div className="space-y-6 mt-6">
        <CreatePost addPost={addPost} />

        {/* Feed Posts */}
        {posts.map(post => (
          <PostCard key={post.id} post={post} onUpdatePost={handleUpdatePost} />
        ))}
      </div>
    </div>
  );
}
