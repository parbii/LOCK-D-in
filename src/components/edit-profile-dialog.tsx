
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from './ui/input';

interface EditProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentName: string;
    currentUsername: string;
    currentBio: string;
    isPublic: boolean;
    onSave: (newName: string, newUsername: string, newBio: string, newIsPublic: boolean) => void;
}

export function EditProfileDialog({ open, onOpenChange, currentName, currentUsername, currentBio, isPublic, onSave }: EditProfileDialogProps) {
    const [name, setName] = useState(currentName);
    const [username, setUsername] = useState(currentUsername);
    const [bio, setBio] = useState(currentBio);
    const [publicProfile, setPublicProfile] = useState(isPublic);

    useEffect(() => {
        setName(currentName);
        setUsername(currentUsername);
        setBio(currentBio);
        setPublicProfile(isPublic);
    }, [open, currentName, currentUsername, currentBio, isPublic]);

    const handleSave = () => {
        onSave(name, username, bio, publicProfile);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us a little bit about yourself"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                            <Label>Public Profile</Label>
                            <p className="text-xs text-muted-foreground">
                                Allow others to see your profile, goals, and posts.
                            </p>
                        </div>
                        <Switch
                            checked={publicProfile}
                            onCheckedChange={setPublicProfile}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
