
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, MapPin, PlusCircle, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ServiceEvent {
    id: number;
    title: string;
    description: string;
    community: string;
    location: string;
    date: Date;
    attendees: number;
    image: string;
    imageAiHint: string;
}

const initialEvents: ServiceEvent[] = [
    {
        id: 1,
        title: "Community Park Cleanup",
        description: "Let's get together to clean up and beautify our local park. Gloves and bags will be provided.",
        community: "Fitness Fanatics",
        location: "Central Park",
        date: new Date(2024, 10, 15, 9),
        attendees: 25,
        image: "https://placehold.co/600x400.png",
        imageAiHint: "community park",
    },
    {
        id: 2,
        title: "Mentorship Day for Startups",
        description: "An online event where experienced entrepreneurs mentor newcomers in the startup world.",
        community: "Startup Grinders",
        location: "Online",
        date: new Date(2024, 11, 5, 14),
        attendees: 150,
        image: "https://placehold.co/600x400.png",
        imageAiHint: "business mentorship",
    },
];

// Mock data for communities the user has joined
const joinedCommunities = [
    { id: 1, name: "Fitness Fanatics" },
    { id: 3, name: "Startup Grinders" },
];

export default function ServiceEventsPage() {
    const [events, setEvents] = useState<ServiceEvent[]>(initialEvents);
    const [open, setOpen] = useState(false);
    
    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [community, setCommunity] = useState("");
    const [date, setDate] = useState<Date | undefined>(undefined);

    const handleCreateEvent = () => {
        if (!title || !description || !location || !community || !date) {
            // Basic validation
            alert("Please fill out all fields.");
            return;
        }

        const newEvent: ServiceEvent = {
            id: Date.now(),
            title,
            description,
            location,
            community,
            date,
            attendees: 1, // Starts with the creator
            image: "https://placehold.co/600x400.png",
            imageAiHint: "community event",
        };

        setEvents(prev => [newEvent, ...prev]);
        
        // Reset form and close dialog
        setTitle("");
        setDescription("");
        setLocation("");
        setCommunity("");
        setDate(undefined);
        setOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Service Events</h1>
                    <p className="text-muted-foreground">Engage with your community through service.</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create a New Service Event</DialogTitle>
                            <DialogDescription>
                                Organize an event to bring your community together and make a difference.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Charity Fun Run" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell us about the event" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., City Hall or Online" />
                            </div>
                             <div className="grid gap-2">
                                <Label>Community</Label>
                                <Select onValueChange={setCommunity} value={community}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a community" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {joinedCommunities.map(c => (
                                            <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateEvent}>Create Event</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Link href={`/service-events/${event.id}`} key={event.id} className="group">
                        <Card className="overflow-hidden h-full flex flex-col">
                           <div className="relative aspect-video w-full overflow-hidden">
                                <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" data-ai-hint={event.imageAiHint} className="group-hover:scale-105 transition-transform duration-300"/>
                           </div>
                           <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{event.title}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-2">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{event.location}</span>
                                </div>
                           </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
