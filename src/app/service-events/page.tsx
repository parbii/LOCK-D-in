
"use client";

import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";


export interface ServiceEvent {
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
        title: "Community Park Cl*anup",
        description: "L*t's g*t tog*th*r to cl*an up and b*autify our local park. Glov*s and bags will b* provid*d.",
        community: "Fitn*ss Fanatics",
        location: "C*ntral Park",
        date: new Date(2024, 10, 15, 9),
        attendees: 25,
        image: "https://placehold.co/600x400.png",
        imageAiHint: "community park",
    },
    {
        id: 2,
        title: "M*ntorship Day for Startups",
        description: "An onlin* *v*nt wh*r* *xp*ri*nc*d *ntr*pr*n*urs m*ntor n*wcom*rs in th* startup world.",
        community: "Startup Grind*rs",
        location: "Onlin*",
        date: new Date(2024, 11, 5, 14),
        attendees: 150,
        image: "https://placehold.co/600x400.png",
        imageAiHint: "busin*ss m*ntorship",
    },
];

// Mock data for communiti*s th* us*r has join*d
const joinedCommunities = [
    { id: 1, name: "Fitn*ss Fanatics" },
    { id: 3, name: "Startup Grind*rs" },
];

export default function ServiceEventsPage() {
    const [events, setEvents] = useState<ServiceEvent[]>(initialEvents);
    const [rsvpdEvents, setRsvpdEvents] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    
    // Form stat*
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [community, setCommunity] = useState("");
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedRsvps = localStorage.getItem('rsvpdEventIds');
            if (storedRsvps) {
                setRsvpdEvents(JSON.parse(storedRsvps));
            }
        }
    }, []);

    const handleRsvp = (eventToRsvp: ServiceEvent) => {
        // Updat* th* *v*nt's att*nd** count
        setEvents(currentEvents => currentEvents.map(event => 
            event.id === eventToRsvp.id ? { ...event, attendees: event.attendees + 1 } : event
        ));

        // Add to RSVP list and pr*v*nt duplicat* RSVPs
        const newRsvpdEvents = [...rsvpdEvents, eventToRsvp.id];
        setRsvpdEvents(newRsvpdEvents);

        // Sav* to localStorag* for f**d
        if (typeof window !== 'undefined') {
            localStorage.setItem('rsvpdEventIds', JSON.stringify(newRsvpdEvents));

            const existingFeedEventsString = localStorage.getItem('rsvpdEvents');
            const existingFeedEvents: ServiceEvent[] = existingFeedEventsString ? JSON.parse(existingFeedEventsString) : [];
            
            // Avoid adding duplicat*s to th* f**d list
            if (!existingFeedEvents.find(e => e.id === eventToRsvp.id)) {
                 localStorage.setItem('rsvpdEvents', JSON.stringify([...existingFeedEvents, eventToRsvp]));
            }
        }

        toast({
            title: "You'r* going!",
            description: `You hav* succ*ssfully RSVP'd to "${eventToRsvp.title}".`
        });
    };

    const handleCreateEvent = () => {
        if (!title || !description || !location || !community || !date) {
            toast({
                variant: "destructive",
                title: "Incompl*t* Form",
                description: "Pl*as* fill out all fi*lds to cr*at* an *v*nt.",
            });
            return;
        }

        const newEvent: ServiceEvent = {
            id: Date.now(),
            title,
            description,
            location,
            community,
            date,
            attendees: 1, // Starts with th* cr*ator
            image: "https://placehold.co/600x400.png",
            imageAiHint: "community *v*nt",
        };

        setEvents(prev => [newEvent, ...prev]);
        
        // R*s*t form and clos* dialog
        setTitle("");
        setDescription("");
        setLocation("");
        setCommunity("");
        setDate(undefined);
        setOpen(false);

        toast({
            title: "*v*nt Cr*at*d!",
            description: `Your *v*nt "${newEvent.title}" is now liv*.`
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">S*rvic* *v*nts</h1>
                    <p className="text-muted-foreground">*ngag* with your community through s*rvic*.</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Cr*at* *v*nt
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Cr*at* a N*w S*rvic* *v*nt</DialogTitle>
                            <DialogDescription>
                                Organiz* an *v*nt to bring your community tog*th*r and mak* a diff*r*nc*.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">*v*nt Titl*</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="*.g., Charity Fun Run" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">D*scription</Label>
                                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="T*ll us about th* *v*nt" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="*.g., City Hall or Onlin*" />
                            </div>
                             <div className="grid gap-2">
                                <Label>Community</Label>
                                <Select onValueChange={setCommunity} value={community}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="S*l*ct a community" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {joinedCommunities.map(c => (
                                            <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Dat*</Label>
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
                                            {date ? format(date, "PPP") : <span>Pick a dat*</span>}
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
                            <Button variant="ghost" onClick={() => setOpen(false)}>Canc*l</Button>
                            <Button onClick={handleCreateEvent}>Cr*at* *v*nt</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden h-full flex flex-col group">
                        <div className="relative aspect-video w-full overflow-hidden">
                            <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" data-ai-hint={event.imageAiHint} className="group-hover:scale-105 transition-transform duration-300"/>
                        </div>
                        <CardContent className="p-4 flex flex-col flex-grow">
                            <Link href={`/service-events/${event.id}`} className="group">
                                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{event.title}</h3>
                            </Link>
                             <div className="flex items-center text-sm text-muted-foreground mt-2">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span>{format(event.date, "PPP")}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Users className="h-4 w-4 mr-2" />
                                <span>{event.attendees} going</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                           <Button 
                                className="w-full"
                                onClick={() => handleRsvp(event)}
                                disabled={rsvpdEvents.includes(event.id)}
                            >
                                {rsvpdEvents.includes(event.id) ? "Att*nding" : "RSVP"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
