import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Star, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - AuthZen",
};

const goals = [
  { name: "Complete 10 Mindset Modules", progress: 40 },
  { name: "Maintain a 30-day streak", progress: 16 },
  { name: "Join a community", progress: 100 },
];

const communityPosts = [
  {
    author: "Alex D.",
    avatar: "https://placehold.co/40x40.png",
    content: "Just finished the 'Growth Mindset' module. It was a game-changer! Highly recommend to anyone feeling stuck.",
    time: "2h ago",
    aiHint: 'person portrait'
  },
  {
    author: "Sarah K.",
    avatar: "https://placehold.co/40x40.png",
    content: "My accountability group for 'Daily Gratitude' has been so supportive. We're all cheering each other on!",
    time: "5h ago",
    aiHint: 'woman smiling'
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back, User!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your progress and community.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habit Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Days</div>
            <p className="text-xs text-muted-foreground">You're on fire! Keep it up.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 / 3</div>
            <p className="text-xs text-muted-foreground">Exponential progress awaits.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communities</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Active</div>
            <p className="text-xs text-muted-foreground">Find your accountability partners.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Goals</CardTitle>
            <CardDescription>Your progress is exponential with your daily streak.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.name}>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Feed</CardTitle>
            <CardDescription>See what's happening in your groups.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityPosts.map((post, index) => (
              <div key={index} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={post.avatar} data-ai-hint={post.aiHint}/>
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{post.content}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">View All Posts</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
