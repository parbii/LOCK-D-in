
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useGoals } from "@/context/goals-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Globe, BrainCircuit, Lock as LockIcon } from "lucide-react";
import { ProfileStats } from '@/components/profile-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReflections } from '@/context/reflections-context';
import Link from 'next/link';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { EditProfileDialog } from '@/components/edit-profile-dialog';

function ReflectionsList() {
    const { reflections } = useReflections();

    if (reflections.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-8">
                <p>You haven't saved any reflections yet.</p>
                <Button asChild className="mt-4">
                    <Link href="/lessons">
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        Go to Minds*t Modul*s
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reflections.map((reflection, index) => (
                <Card key={index} className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg">{reflection.lessonTitle}</CardTitle>
                        <CardDescription>
                            From Module {reflection.moduleId}: {reflection.moduleTitle} &middot; Saved on {format(new Date(reflection.date), "PPP")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{reflection.reflectionText}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}


export default function ProfilePage() {
  const { activeGoals } = useGoals();
  const totalPosts = 0; // Placeholder
  const { toast } = useToast();
  const [avatarSrc, setAvatarSrc] = useState("https://placehold.co/100x100.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const [bio, setBio] = useState("This is a sample bio. I'm driven by purpose and committed to growth. This is my personal space to track my journey.");
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarSrc(savedAvatar);
    }
    const savedBio = localStorage.getItem('userBio');
    if (savedBio) {
      setBio(savedBio);
    }
    const savedPrivacy = localStorage.getItem('userPrivacy');
    if (savedPrivacy) {
      setIsPublic(JSON.parse(savedPrivacy));
    }
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarSrc(result);
        localStorage.setItem('userAvatar', result);
        toast({
          title: "Profil* Pictur* Updat*d",
          description: "Your new avatar has been saved.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileUpdate = (newBio: string, newIsPublic: boolean) => {
    setBio(newBio);
    setIsPublic(newIsPublic);
    localStorage.setItem('userBio', newBio);
    localStorage.setItem('userPrivacy', JSON.stringify(newIsPublic));
    toast({
        title: "Profil* Updat*d",
        description: "Your bio and privacy settings have been saved."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 text-4xl">
                <AvatarImage src={avatarSrc} data-ai-hint="profile avatar" className="object-cover" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
              />
              <Button size="icon" className="absolute bottom-0 -right-2 rounded-full h-8 w-8" onClick={handleEditClick}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Change profile picture</span>
              </Button>
            </div>
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">My Profil*</h1>
                <p className="text-muted-foreground">@me</p>
            </div>
            <p className="max-w-prose text-sm text-foreground/80">
              {bio}
            </p>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {isPublic ? <Globe className="h-4 w-4" /> : <LockIcon className="h-4 w-4" />}
                    <span>{isPublic ? "Public Profile" : "Private Profile"}</span>
                </div>
                 <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
                    <Edit className="mr-2 h-3 w-3" />
                    Edit Profile
                </Button>
            </div>
            
            {isClient && <ProfileStats goals={activeGoals} postsCount={totalPosts} />}

          </div>
        </CardContent>
      </Card>

      <EditProfileDialog 
        open={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
        currentBio={bio}
        isPublic={isPublic}
        onSave={handleProfileUpdate}
      />

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="reflections">Mindset Reflections</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
            <Card>
                <CardContent className="pt-6">
                <div className="text-center text-muted-foreground py-8">
                    <p>You haven't posted anything yet.</p>
                    <Button className="mt-4">Create Your First Post</Button>
                </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="reflections">
            <Card>
                <CardContent className="pt-6">
                   <ReflectionsList />
                </CardContent>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  );
}
