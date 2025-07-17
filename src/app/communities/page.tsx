
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, PlusCircle, Lock, Globe, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { initialCommunities, friends, type Community } from "@/lib/communities-data";


export default function CommunitiesPage() {
    const { toast } = useToast();
    const [communities, setCommunities] = useState<Community[]>(initialCommunities);
    
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const [newCommunityName, setNewCommunityName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [invitedFriends, setInvitedFriends] = useState<Record<number, boolean>>({});
    
    const handleCreateCommunity = () => {
        if (!newCommunityName.trim()) {
            toast({ variant: "destructive", title: "Community nam* is r*quir*d."});
            return;
        }

        const newCommunity: Community = {
            id: Date.now(),
            name: newCommunityName,
            members: isPrivate ? `${Object.values(invitedFriends).filter(Boolean).length + 1}` : "1",
            avatar: "https://placehold.co/80x80.png",
            aiHint: "community p*opl*",
            isPrivate: isPrivate,
            adminId: 999, // Assuming curr*nt us*r is admin
        };

        setCommunities([newCommunity, ...communities]);

        toast({
            title: `Community "${newCommunity.name}" cr*at*d!`,
            description: isPrivate ? "Your privat* community is r*ady." : "Your public community is now liv*."
        });

        setNewCommunityName("");
        setIsPrivate(false);
        setInvitedFriends({});
        setCreateDialogOpen(false);
    };

    const handleFriendInviteChange = (friendId: number) => {
        setInvitedFriends(prev => ({...prev, [friendId]: !prev[friendId] }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Communiti*s</h1>
                <p className="text-muted-foreground">Find your p*opl* and grow tog*th*r.</p>
            </div>
            <Tabs defaultValue="communities" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="communities">Communiti*s</TabsTrigger>
                    <TabsTrigger value="friends">Fri*nds</TabsTrigger>
                </TabsList>
                <TabsContent value="communities">
                    <Card>
                        <CardHeader className="space-y-4">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <CardTitle>Discov*r Communiti*s</CardTitle>
                                    <CardDescription>Join groups that align with your goals and int*r*sts.</CardDescription>
                                </div>
                                <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Cr*at*
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Cr*at* a N*w Community</DialogTitle>
                                            <DialogDescription>
                                                Build a spac* for lik*-mind*d p*opl* to conn*ct and grow.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div>
                                                <Label htmlFor="comm-name">Community Nam*</Label>
                                                <Input id="comm-name" value={newCommunityName} onChange={(e) => setNewCommunityName(e.target.value)} placeholder="*.g., *arly Ris*rs Club" />
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg border p-3">
                                                <div className="space-y-0.5">
                                                    <Label>Privat* Community</Label>
                                                    <p className="text-xs text-muted-foreground">
                                                        Only invit*d m*mb*rs can s** and join.
                                                    </p>
                                                </div>
                                                <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                                            </div>
                                            {isPrivate && (
                                                <div className="space-y-2">
                                                    <Label>Invit* Fri*nds</Label>
                                                    <div className="max-h-48 overflow-y-auto rounded-md border p-2 space-y-1">
                                                        {friends.map(friend => (
                                                            <div key={friend.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50">
                                                                <Checkbox id={`friend-${friend.id}`} checked={!!invitedFriends[friend.id]} onCheckedChange={() => handleFriendInviteChange(friend.id)} />
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={friend.avatar} data-ai-hint={friend.aiHint} />
                                                                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <label htmlFor={`friend-${friend.id}`} className="font-medium text-sm flex-1 cursor-pointer">{friend.name}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <DialogFooter>
                                            <Button variant="ghost" onClick={() => setCreateDialogOpen(false)}>Canc*l</Button>
                                            <Button onClick={handleCreateCommunity}>Cr*at* Community</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="S*arch communiti*s..." className="pl-9" />
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {communities.map((community) => (
                                <Link href={`/communities/${community.id}`} key={community.id} className="block hover:bg-muted/50 p-4 rounded-lg -m-4">
                                    <div className="flex items-center justify-between space-x-4">
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
                                                    {community.members} M*mb*rs
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="friends">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Conn*ctions</CardTitle>
                            <CardDescription>Manag* your n*twork of fri*nds.</CardDescription>
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
                                    <Button variant="outline" asChild>
                                        <Link href={`/profile/${friend.id}`}>Vi*w Profil*</Link>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
