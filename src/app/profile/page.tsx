import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Lock, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - LockdIn",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 text-4xl">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="profile avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <h1 className="text-2xl font-bold">User Name</h1>
            <p className="text-muted-foreground">@username</p>
            <p className="mt-2 max-w-prose">
              This is a sample bio. Users can write a short description about themselves here. Driven by purpose and committed to growth.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>Public Profile</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Posts</CardTitle>
          <CardDescription>Content you've shared with the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>You haven't posted anything yet.</p>
            <Button className="mt-4">Create Your First Post</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
