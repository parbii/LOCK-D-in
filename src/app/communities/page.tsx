
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, PlusCircle, Lock, Globe, X } from "lucide-react";
import { useGoals } from "@/context/goals-context";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface Community {
    id: number;
    name: string;
    members: string;
    avatar: string;
    aiHint: string;
    isPrivate: boolean;
}

const initialCommunities: Community[] = [
    {
        id: 1,
        name: "Fitness Fanatics",
        members: "1.2k",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "group fitness",
        isPrivate: false,
    },
    {
        id: 2,
        name: "Mindful Achievers",
        members: "850",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "meditation group",
        isPrivate: false,
    },
    {
        id: 3,
        name: "Startup Grinders",
        members: "2.5k",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "business meeting",
        isPrivate: false,
    },
    {
        id: 4,
        name: "Creative Minds",
        members: "600",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "art workshop",
        isPrivate: false,
    },
];

const friends = [
    {
        id: 1,
        name: "Sarah Lee",
        username: "@sarahlee",
        avatar: "https://placehold.co/40x40.png",
        aiHint: "woman smiling"
    },
    {
        id: 2,
        name: "David Kim",
        username: "@davidkim",
        avatar: "https://placehold.co/40x40.png",
        aiHint: "man portrait"
    },
    {
        id: 3,
        name: "Emily Chen",
        username: "@emilychen",
        avatar: "https://placehold.co/40x40.png",
        aiHint: "woman hiking"
    }
]

export default function CommunitiesPage() {
    const { activeGoals } = useGoals();
    const { toast } = useToast();
    const [communities, setCommunities] = useState<Community[]>(initialCommunities);
    const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);
    
    // State for create community dialog
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const [newCommunityName, setNewCommunityName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [invitedFriends, setInvitedFriends] = useState<Record<number, boolean>>({});

    const handleJoinClick = (community: Community) => {
        if (community.isPrivate) {
             toast({
                title: "This is a private community",
                description: "You can only join by invitation.",
            });
            return;
        }
        
        const hasLockedInPublicGoal = activeGoals.some(goal => goal.progress >= 100 && goal.isPublic);

        if (hasLockedInPublicGoal) {
            setJoinedCommunities([...joinedCommunities, community.id]);
            toast({
                title: "Welcome to the community!",
                description: "You've successfully joined.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Goal Required to Join",
                description: "You must have at least one 'LockdIn' public goal to join a community. Keep pushing!",
            });
        }
    };
    
    const handleCreateCommunity = () => {
        if (!newCommunityName.trim()) {
            toast({ variant: "destructive", title: "Community name is required."});
            return;
        }

        const newCommunity: Community = {
            id: Date.now(),
            name: newCommunityName,
            members: isPrivate ? `${Object.values(invitedFriends).filter(Boolean).length + 1}` : "1",
            avatar: "https://placehold.co/80x80.png",
            aiHint: "community people",
            isPrivate: isPrivate,
        };

        setCommunities([newCommunity, ...communities]);
        setJoinedCommunities([...joinedCommunities, newCommunity.id]);

        toast({
            title: `Community "${newCommunity.name}" created!`,
            description: isPrivate ? "Your private community is ready." : "Your public community is now live."
        });

        // Reset form and close dialog
        setNewCommunityName("");
        setIsPrivate(false);
        setInvitedFriends({});
        setCreateDialogOpen(false);
    };

    const handleFriendInviteChange = (friendId: number) => {
        setInvitedFriends(prev => ({...prev, [friendId]: !prev[friendId] }));
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Communities</h1>
                <p className="text-muted-foreground">Find your people and grow together.</p>
            </div>
            <Tabs defaultValue="communities">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="communities">Communities</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                </TabsList>
                <TabsContent value="communities">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Discover Communities</CardTitle>
                                    <CardDescription>Join groups that align with your goals and interests.</CardDescription>
                                </div>
                                <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Create
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create a New Community</DialogTitle>
                                            <DialogDescription>
                                                Build a space for like-minded people to connect and grow.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="comm-name">Community Name</Label>
                                                <Input id="comm-name" value={newCommunityName} onChange={(e) => setNewCommunityName(e.target.value)} placeholder="e.g., Early Risers Club" />
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg border p-3">
                                                <div className="space-y-0.5">
                                                    <Label>Private Community</Label>
                                                    <p className="text-xs text-muted-foreground">
                                                        Only invited members can see and join.
                                                    </p>
                                                </div>
                                                <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                                            </div>
                                            {isPrivate && (
                                                <div>
                                                    <Label>Invite Friends</Label>
                                                    <div className="space-y-2 mt-2 max-h-48 overflow-y-auto rounded-md border p-2">
                                                        {friends.map(friend => (
                                                            <div key={friend.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50">
                                                                <Checkbox id={`friend-${friend.id}`} checked={!!invitedFriends[friend.id]} onCheckedChange={() => handleFriendInviteChange(friend.id)} />
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={friend.avatar} data-ai-hint={friend.aiHint} />
                                                                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <label htmlFor={`friend-${friend.id}`} className="font-medium text-sm">{friend.name}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <DialogFooter>
                                            <Button variant="ghost" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                                            <Button onClick={handleCreateCommunity}>Create Community</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="relative pt-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search communities..." className="pl-9" />
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            {communities.map((community) => (
                                <div key={community.id} className="flex items-center justify-between space-x-4">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={community.avatar} data-ai-hint={community.aiHint} />
                                            <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold flex items-center gap-2">
                                                {community.name}
                                                {community.isPrivate ? <Lock className="h-4 w-4 text-muted-foreground" /> : <Globe className="h-4 w-4 text-muted-foreground" />}
                                            </p>
                                            <p className="text-sm text-muted-foreground flex items-center">
                                                <Users className="h-3 w-3 mr-1.5" />
                                                {community.members} Members
                                            </p>
                                        </div>
                                    </div>
                                    <Button 
                                      onClick={() => handleJoinClick(community)}
                                      disabled={joinedCommunities.includes(community.id)}
                                    >
                                      {joinedCommunities.includes(community.id) ? "Joined" : "Join"}
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="friends">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Connections</CardTitle>
                            <CardDescription>Manage your network of friends.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {friends.map((friend) => (
                                <div key={friend.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={friend.avatar} data-ai-hint={friend.aiHint} />
                                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{friend.name}</p>
                                            <p className="text-xs text-muted-foreground">{friend.username}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline">Message</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
