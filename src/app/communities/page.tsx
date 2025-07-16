import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Communities - LockdIn",
    description: "Find and join communities.",
};

const communities = [
    {
        id: 1,
        name: "Fitness Fanatics",
        members: "1.2k",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "group fitness"
    },
    {
        id: 2,
        name: "Mindful Achievers",
        members: "850",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "meditation group"
    },
    {
        id: 3,
        name: "Startup Grinders",
        members: "2.5k",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "business meeting"
    },
    {
        id: 4,
        name: "Creative Minds",
        members: "600",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "art workshop"
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
                            <CardTitle>Discover Communities</CardTitle>
                            <CardDescription>Join groups that align with your goals and interests.</CardDescription>
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
                                            <p className="font-semibold">{community.name}</p>
                                            <p className="text-sm text-muted-foreground flex items-center">
                                                <Users className="h-3 w-3 mr-1.5" />
                                                {community.members} Members
                                            </p>
                                        </div>
                                    </div>
                                    <Button>Join</Button>
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
