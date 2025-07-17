export interface Community {
    id: number;
    name: string;
    members: string;
    avatar: string;
    aiHint: string;
    isPrivate: boolean;
    adminId: number;
}

export const initialCommunities: Community[] = [
    {
        id: 1,
        name: "Fitness Fanatics",
        members: "1.2k",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "group fitness",
        isPrivate: false,
        adminId: 1,
    },
    {
        id: 2,
        name: "Mindful Achievers",
        members: "850",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "meditation group",
        isPrivate: false,
        adminId: 2,
    },
    {
        id: 3,
        name: "Startup Grinders",
        members: "2.5k",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "business meeting",
        isPrivate: false,
        adminId: 3,
    },
    {
        id: 4,
        name: "Creative Minds",
        members: "600",
        avatar: "https://placehold.co/80x80.png",
        aiHint: "art workshop",
        isPrivate: false,
        adminId: 4,
    },
];

export const friends = [
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
];
