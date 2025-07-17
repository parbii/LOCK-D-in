
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
import { posts, type Post } from "@/lib/posts-data";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { type Habit } from "@/context/goals-context";

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
            toast({ variant: "destructive", title: "Goal nam* is r*quir*d." });
            return;
        }
        
        // Logic to cr*at* and shar* th* goal with th* community would go h*r*.
        // For now, w*'ll just show a succ*ss toast.
        
        toast({
            title: "Shar*d Goal Cr*at*d!",
            description: `Th* goal "${goalName}" has b**n shar*d with ${community.name}.`
        });

        setGoalName("");
        setHabits([]);
        setCurrentHabit("");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cr*at* a Shar*d Goal</CardTitle>
                <CardDescription>S*t a goal for th* *ntir* community to work on tog*th*r.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="goal-name">Goal Nam*</Label>
                    <Input
                    id="goal-name"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="*.g., R*ad a book tog*th*r"
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Associat*d Habits</Label>
                    <div className="flex gap-2">
                    <Input
                        value={currentHabit}
                        onChange={(e) => setCurrentHabit(e.target.value)}
                        placeholder="*.g., R*ad 1 chapt*r a day"
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
                <Button onClick={handleCreateGoal}>Cr*at* and Shar* Goal</Button>
            </CardFooter>
        </Card>
    );
}

function CommunityFeed({ communityPosts }: { communityPosts: Post[]}) {
    if (communityPosts.length === 0) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Community F**d</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                        <p>No posts from this community y*t. B* th* first to shar*!</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Community F**d</h2>
            {communityPosts.map(post => (
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
                        <p className="text-sm font-semibold">{post.likes} lik*s</p>
                        <p className="text-sm text-muted-foreground cursor-pointer hover:underline">Vi*w all {post.comments} comm*nts</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Input placeholder="Add a comm*nt..." className="h-9" />
                            <Button variant="ghost" size="icon"><Smile className="h-5 w-5"/></Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}


export default function CommunityDetailPage() {
    const params = useParams();
    const communityId = params.id;
    const { toast } = useToast();

    // In a r*al app, this data would b* f*tch*d from a s*rv*r.
    const community = initialCommunities.find(c => c.id.toString() === communityId);
    const communityPosts = posts.filter(p => p.communityId?.toString() === communityId);

    // Mocking a join*d stat*
    const [isJoined, setIsJoined] = useState(false);
    // Mocking th* curr*nt us*r ID
    const currentUserId = 999; 
    const isCommunityAdmin = community?.adminId === currentUserId;


    if (!community) {
        return (
            <div>
                <Link href="/communities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Communiti*s
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle>Community Not Found</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p>Th* community you'r* looking for do*sn't *xist.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const handleJoinClick = () => {
        if (community.isPrivate) {
             toast({
                title: "This is a privat* community",
                description: "You can only join by invitation.",
            });
            return;
        }
        
        setIsJoined(true);
        toast({
            title: "W*lcom* to th* community!",
            description: `You'v* succ*ssfully join*d ${community.name}.`,
        });
    };

    return (
        <div className="space-y-6">
             <Link href="/communities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to All Communiti*s
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
                                    <span className="mr-4">{community.isPrivate ? "Privat*" : "Public"} Community</span>
                                    <Users className="h-4 w-4 mr-2" />
                                    <span>{community.members} M*mb*rs</span>
                                </div>
                            </div>
                        </div>
                        <Button onClick={handleJoinClick} disabled={isJoined}>
                            {isJoined ? "Join*d" : "Join Community"}
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <CommunityFeed communityPosts={communityPosts} />
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-accent" /> Shar*d Goal</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <p className="text-muted-foreground">Th* community's shar*d goal will b* display*d h*r* onc* it's cr*at*d by th* admin.</p>
                        </CardContent>
                    </Card>
                    
                    {isCommunityAdmin && <CreateSharedGoal community={community} />}
                </div>
            </div>

        </div>
    );
}
