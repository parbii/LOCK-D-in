
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Lock, Globe, PlusCircle, Trash2, X, Target, ArrowLeft, Heart, MessageCircle, Send, Bookmark, Smile } from "lucide-react";
import Link from "next/link";
import { initialCommunities, type Community } from "@/lib/communities-data";
import { posts as allPosts, type Post, type Comment } from "@/lib/posts-data";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { type Habit } from "@/context/goals-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function CreateSharedGoal({ community }: { community: Community }) {
    const { toast } = useToast();
    const [goalName, setGoalName] = useState("");
    const [habits, setHabits] = useState<Habit[]>([]);
    const [currentHabit, setCurrentHabit] = useState("");

    const handleAddHabit = () => {
        if (currentHabit.trim() !== "" && !habits.some(h => h.text === currentHabit.trim())) {
          setHabits([...habits, { id: Date.now(), text: currentHabit.trim() }]);
          setCurrentHabit("");
        }
    };

    const handleRemoveHabit = (habitId: number) => {
        setHabits(habits.filter(habit => habit.id !== habitId));
    };

    const handleCreateGoal = () => {
        if (!goalName.trim()) {
            toast({ variant: "destructive", title: "Goal Name is Required." });
            return;
        }
        
        // Logic to create and share the goal with the community would go here.
        // For now, we'll just show a success toast.
        
        toast({
            title: "Shared Goal Created!",
            description: `The goal "${goalName}" has been shared with ${community.name}.`
        });

        setGoalName("");
        setHabits([]);
        setCurrentHabit("");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create a Shared Goal</CardTitle>
                <CardDescription>Set a goal for the entire community to work on together.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input
                    id="goal-name"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="e.g., Read a book together"
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Associated Habits</Label>
                    <div className="flex gap-2">
                    <Input
                        value={currentHabit}
                        onChange={(e) => setCurrentHabit(e.target.value)}
                        placeholder="e.g., Read 1 chapter a day"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddHabit();
                            }
                        }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddHabit}>
                        Add Habit
                    </Button>
                    </div>
                    <div className="space-y-2 mt-2">
                    {habits.map((habit) => (
                        <div key={habit.id} className="flex items-center justify-between rounded-md bg-muted/50 p-2 pl-3">
                        <span className="text-sm">{habit.text}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveHabit(habit.id)} className="h-7 w-7">
                            <X className="h-4 w-4" />
                        </Button>
                        </div>
                    ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleCreateGoal}>Create and Share Goal</Button>
            </CardFooter>
        </Card>
    );
}

function PostCard({ post, onUpdatePost }: { post: Post, onUpdatePost: (updatedPost: Post) => void }) {
    const [commentText, setCommentText] = useState("");
    const [isCommentsOpen, setCommentsOpen] = useState(false);
    const postComments = Array.isArray(post.comments) ? post.comments : [];

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
            comments: [...postComments, newComment],
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
                </div>
            </CardHeader>
            <CardContent>
            <p className="mb-4">{post.content}</p>
            {post.image && (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                    <Image src={post.image} alt="Post image" fill className="object-cover" data-ai-hint={post.imageAiHint}/>
                </div>
            )}
            </CardContent>
            <div className="px-6 pb-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={handleLike}><Heart className={`h-5 w-5 ${post.liked ? 'text-red-500 fill-current' : ''}`} /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setCommentsOpen(true)}><MessageCircle className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><Send className="h-5 w-5" /></Button>
                    </div>
                    <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5" /></Button>
                </div>
                <p className="text-sm font-semibold">{post.likes} likes</p>
                {postComments.length > 0 && 
                    <p className="text-sm text-muted-foreground cursor-pointer hover:underline" onClick={() => setCommentsOpen(true)}>View all {postComments.length} comments</p>
                }
                <div className="flex items-center gap-2 mt-2">
                    <Input placeholder="Add a comment..." className="h-9 flex-1" value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddComment()} />
                    <Button variant="ghost" size="icon"><Smile className="h-5 w-5"/></Button>
                    <Button variant="ghost" size="icon" onClick={handleAddComment}><Send className="h-5 w-5"/></Button>
                </div>
            </div>
             <Dialog open={isCommentsOpen} onOpenChange={setCommentsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comments on {post.user.name}'s post</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 p-4">
                        {postComments.map(comment => (
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
                         {postComments.length === 0 && (
                            <p className="text-sm text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

function CommunityFeed({ initialPosts, onUpdatePost }: { initialPosts: Post[], onUpdatePost: (post: Post) => void }) {
    if (initialPosts.length === 0) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Community Feed</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                        <p>No posts from this community yet. Be the first to share!</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Community Feed</h2>
            {initialPosts.map(post => (
                <PostCard key={post.id} post={post} onUpdatePost={onUpdatePost} />
            ))}
        </div>
    )
}


export default function CommunityDetailPage() {
    const params = useParams();
    const communityId = params.id;
    const { toast } = useToast();

    // In a real app, this data would be fetched from a server.
    const community = initialCommunities.find(c => c.id.toString() === communityId);
    
    const [posts, setPosts] = useState<Post[]>(() => 
        allPosts
            .filter(p => p.communityId?.toString() === communityId)
            .map(p => ({...p, comments: Array.isArray(p.comments) ? p.comments : []}))
    );

    const handleUpdatePost = (updatedPost: Post) => {
        setPosts(currentPosts => currentPosts.map(p => p.id === updatedPost.id ? updatedPost : p));
        // Note: This won't persist across sessions without a backend or global state management
    };

    // Mocking a joined state
    const [isJoined, setIsJoined] = useState(false);
    // Mocking the current user ID
    const currentUserId = 999; 
    const isCommunityAdmin = community?.adminId === currentUserId;


    if (!community) {
        return (
            <div>
                <Link href="/communities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Communities
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle>Community Not Found</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p>The community you're looking for doesn't exist.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const handleJoinClick = () => {
        if (community.isPrivate) {
             toast({
                title: "This is a private community",
                description: "You can only join by invitation.",
            });
            return;
        }
        
        setIsJoined(true);
        toast({
            title: "Welcome to the community!",
            description: `You've successfully joined ${community.name}.`,
        });
    };

    return (
        <div className="space-y-6">
             <Link href="/communities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to All Communities
            </Link>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={community.avatar} data-ai-hint={community.aiHint} />
                                <AvatarFallback className="text-3xl">{community.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <CardTitle className="text-3xl">{community.name}</CardTitle>
                                <div className="flex items-center text-muted-foreground">
                                    {community.isPrivate ? <Lock className="h-4 w-4 mr-2" /> : <Globe className="h-4 w-4 mr-2" />}
                                    <span className="mr-4">{community.isPrivate ? "Private" : "Public"} Community</span>
                                    <Users className="h-4 w-4 mr-2" />
                                    <span>{community.members} Members</span>
                                </div>
                            </div>
                        </div>
                        <Button onClick={handleJoinClick} disabled={isJoined}>
                            {isJoined ? "Joined" : "Join Community"}
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <CommunityFeed initialPosts={posts} onUpdatePost={handleUpdatePost} />
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-accent" /> Shared Goal</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <p className="text-muted-foreground">The community's shared goal will be displayed here once it's created by the admin.</p>
                        </CardContent>
                    </Card>
                    
                    {isCommunityAdmin && <CreateSharedGoal community={community} />}
                </div>
            </div>

        </div>
    );
}

    