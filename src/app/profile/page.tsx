
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useGoals } from "@/context/goals-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Edit, Globe, BrainCircuit, Lock as LockIcon, Heart, MessageCircle, MoreHorizontal, Send, Bookmark, Smile } from "lucide-react";
import { ProfileStats } from '@/components/profile-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReflections } from '@/context/reflections-context';
import Link from 'next/link';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { EditProfileDialog } from '@/components/edit-profile-dialog';
import { type Post, type Comment, initialPosts } from '@/lib/posts-data';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
                name: "Current User", // This would be the actual logged-in user
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
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
              {post.image && (
                 <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                    <Image src={post.image} alt="Post image" fill className="object-cover" data-ai-hint={post.imageAiHint}/>
                 </div>
              )}
            </CardContent>
            <CardFooter>
                <div className="w-full">
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
                    {postComments.length > 0 && (
                        <p className="text-sm text-muted-foreground cursor-pointer hover:underline" onClick={() => setCommentsOpen(true)}>
                            View all {postComments.length} comments
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
    );
}

export default function ProfilePage() {
  const { activeGoals } = useGoals();
  const { toast } = useToast();
  const [avatarSrc, setAvatarSrc] = useState("https://placehold.co/100x100.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const [name, setName] = useState("My Profile");
  const [username, setUsername] = useState("@me");
  const [bio, setBio] = useState("This is a sample bio. I'm driven by purpose and committed to growth. This is my personal space to track my journey.");
  const [isPublic, setIsPublic] = useState(true);
  
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setIsClient(true);
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) setAvatarSrc(savedAvatar);
    
    const savedName = localStorage.getItem('userName');
    if (savedName) setName(savedName);

    const savedUsername = localStorage.getItem('userUsername');
    if (savedUsername) setUsername(savedUsername);

    const savedBio = localStorage.getItem('userBio');
    if (savedBio) setBio(savedBio);

    const savedPrivacy = localStorage.getItem('userPrivacy');
    if (savedPrivacy) setIsPublic(JSON.parse(savedPrivacy));

    const savedPosts = localStorage.getItem('userPosts');
    const parsedPosts = savedPosts ? JSON.parse(savedPosts) : initialPosts;
    const sanitizedPosts = parsedPosts.map((p: Post) => ({ ...p, comments: Array.isArray(p.comments) ? p.comments : [] }));
    setPosts(sanitizedPosts);
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

  const handleProfileUpdate = (newName: string, newUsername: string, newBio: string, newIsPublic: boolean) => {
    setName(newName);
    setUsername(newUsername);
    setBio(newBio);
    setIsPublic(newIsPublic);
    
    localStorage.setItem('userName', newName);
    localStorage.setItem('userUsername', newUsername);
    localStorage.setItem('userBio', newBio);
    localStorage.setItem('userPrivacy', JSON.stringify(newIsPublic));
    
    toast({
        title: "Profil* Updat*d",
        description: "Your profile details have been saved."
    });
  };
  
  const handleUpdatePost = (updatedPost: Post) => {
    const updatedPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
    setPosts(updatedPosts);
    if (typeof window !== 'undefined') {
        localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 text-4xl">
                <AvatarImage src={avatarSrc} data-ai-hint="profile avatar" className="object-cover" />
                <AvatarFallback>{name.charAt(0) || 'U'}</AvatarFallback>
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
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-muted-foreground">{username}</p>
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
            
            {isClient && <ProfileStats goals={activeGoals} postsCount={posts.length} />}

          </div>
        </CardContent>
      </Card>

      <EditProfileDialog 
        open={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
        currentName={name}
        currentUsername={username}
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
                 {isClient && posts.length > 0 ? (
                    <div className="space-y-6">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} onUpdatePost={handleUpdatePost} />
                    ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>You haven't posted anything yet.</p>
                        <Button asChild className="mt-4">
                            <Link href="/dashboard">Create Your First Post</Link>
                        </Button>
                    </div>
                )}
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

    