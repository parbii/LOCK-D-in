

"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Globe, Target, Flame, FileText, Lock, Heart, MessageCircle, MoreHorizontal, Send, Bookmark, Smile } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { type Goal } from '@/context/goals-context';
import { ProfileStats } from '@/components/profile-stats';
import { type Post, type Comment } from '@/lib/posts-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const friendsData: { id: number, name: string, username: string, avatar: string, aiHint: string, bio: string, publicGoals: Goal[], posts: Post[] }[] = [
    {
        id: 1, name: "Sarah Lee", username: "@sarahlee", avatar: "https://placehold.co/100x100.png", aiHint: "woman smiling", bio: "Fitness enthusiast and marathon runner. Always pushing my limits.",
        publicGoals: [
            { id: 101, name: "Run a 5k", progress: 100, streak: 21, isPublic: true, lastCompleted: "2023-10-26", description: "", habits: [], status: "completed" },
            { id: 102, name: "Read 12 books this year", progress: 75, streak: 3, isPublic: true, lastCompleted: "2023-10-26", description: "", habits: [], status: "active" },
        ],
        posts: [
             { id: 1, user: { name: "Sarah Lee", avatar: "https://placehold.co/40x40.png", aiHint: "woman smiling" }, content: "Crushed my goal of running a 5k this morning! Felt amazing. #nevergiveup #goals", image: "https://placehold.co/600x400.png", imageAiHint: "running marathon", likes: 124, comments: [], time: "2h ago" },
        ]
    },
    {
        id: 2, name: "David Kim", username: "@davidkim", avatar: "https://placehold.co/100x100.png", aiHint: "man portrait", bio: "Tech entrepreneur and mindfulness advocate. Building cool things and staying present.",
        publicGoals: [
             { id: 201, name: "Meditate daily", progress: 100, streak: 45, isPublic: true, lastCompleted: "2023-10-26", description: "", habits: [], status: "completed" },
        ],
        posts: [
            { id: 2, user: { name: "David Kim", avatar: "https://placehold.co/40x40.png", aiHint: "man portrait" }, content: "7-day streak on my 'Daily Devotion' habit! Feeling more focused and centered than ever. 🙏", likes: 89, comments: [], time: "4h ago" },
        ]
    },
    {
        id: 3, name: "Emily Chen", username: "@emilychen", avatar: "https://placehold.co/100x100.png", aiHint: "woman hiking", bio: "Artist and nature lover. Finding inspiration in the wild.",
        publicGoals: [],
        posts: []
    }
].map(friend => ({
    ...friend,
    posts: friend.posts.map(p => ({ ...p, comments: p.comments || [] }))
}));


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
            comments: [...(post.comments || []), newComment],
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
              <p className="mb-4">{post.content}</p>
              {post.image && (
                 <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                    <Image src={post.image} alt="Post image" layout="fill" className="object-cover" data-ai-hint={post.imageAiHint}/>
                 </div>
              )}
            </CardContent>
            <CardFooter>
                <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={handleLike}><Heart className={`h-5 w-5 ${post.liked ? 'text-red-500 fill-current' : ''}`} /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setCommentsOpen(true)}><MessageCircle className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon"><Send className="h-5 w-5" /></Button>
                        </div>
                        <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5" /></Button>
                    </div>
                    <p className="text-sm font-semibold">{post.likes} likes</p>
                    {(post.comments?.length || 0) > 0 &&
                        <p className="text-sm text-muted-foreground cursor-pointer hover:underline" onClick={() => setCommentsOpen(true)}>View all {post.comments.length} comments</p>
                    }
                    <div className="flex items-center gap-2 mt-2">
                        <Input placeholder="Add a comment..." className="h-9 flex-1" value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddComment()} />
                        <Button variant="ghost" size="icon"><Smile className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon" onClick={handleAddComment}><Send className="h-5 w-5"/></Button>
                    </div>
                </div>
            </CardFooter>
            <Dialog open={isCommentsOpen} onOpenChange={setCommentsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comments on {post.user.name}'s post</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 p-4">
                        {(post.comments || []).map(comment => (
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
                         {(post.comments?.length || 0) === 0 && (
                            <p className="text-sm text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

export default function FriendProfilePage() {
    const params = useParams();
    const friendId = params.id;
    
    const [friendData, setFriendData] = useState(() => friendsData.find(f => f.id.toString() === friendId));

    if (!friendData) {
        return <div className="text-center py-10">Friend not found.</div>
    }

    const handleUpdatePost = (updatedPost: Post) => {
        setFriendData(currentData => {
            if (!currentData) return currentData;
            return {
                ...currentData,
                posts: currentData.posts.map(p => p.id === updatedPost.id ? updatedPost : p)
            };
        });
    };
    
    const publicGoals: Goal[] = friendData.publicGoals.map(g => ({...g, habits: [], description: ''}));

    return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-6">
            <Avatar className="w-24 h-24 text-4xl">
              <AvatarImage src={friendData.avatar} data-ai-hint={friendData.aiHint} />
              <AvatarFallback>{friendData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">{friendData.name}</h1>
                <p className="text-muted-foreground">{friendData.username}</p>
            </div>
            <p className="max-w-prose text-sm text-foreground/80">
              {friendData.bio}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>Public Profile</span>
            </div>
            <ProfileStats goals={publicGoals} postsCount={friendData.posts.length} userId={friendData.id}/>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>{friendData.name}'s Public Goals</CardTitle>
            <CardDescription>Goals they are sharing with the community.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {friendData.publicGoals.length > 0 ? (
                friendData.publicGoals.map((goal: any) => (
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
        <h2 className="text-2xl font-bold tracking-tight">{friendData.name}'s Feed</h2>
        {friendData.posts.length > 0 ? friendData.posts.map(post => (
          <PostCard key={post.id} post={post} onUpdatePost={handleUpdatePost} />
        )) : (
            <Card>
                <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                        <p>{friendData.name} hasn't posted anything yet.</p>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
    );
}
