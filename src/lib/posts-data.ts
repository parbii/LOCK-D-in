

export interface Comment {
    id: number;
    user: {
        name: string;
        avatar: string;
        aiHint: string;
    };
    text: string;
    time: string;
}

export interface Post {
    id: number;
    user: {
      name: string;
      avatar: string;
      aiHint: string;
    };
    content: string;
    image?: string;
    imageAiHint?: string;
    likes: number;
    comments: Comment[]; // Changed from number to array of Comment
    time: string;
    communityId?: number;
    liked?: boolean;
}


// Mock data for feed posts
export const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      name: "Jane Doe",
      avatar: "https://placehold.co/40x40.png",
      aiHint: "woman smiling"
    },
    content: "Crushed my goal of running a 5k this morning! Felt amazing. #nevergiveup #goals",
    image: "https://placehold.co/600x400.png",
    imageAiHint: "running marathon",
    likes: 124,
    comments: [],
    time: "2h ago",
    communityId: 1
  },
  {
    id: 2,
    user: {
      name: "John Smith",
      avatar: "https://placehold.co/40x40.png",
      aiHint: "man portrait"
    },
    content: "7-day streak on my 'Daily Devotion' habit! Feeling more focused and centered than ever. 🙏",
    likes: 89,
    comments: [],
    time: "4h ago",
    communityId: 2
  },
    {
    id: 3,
    user: {
      name: "Alex Johnson",
      avatar: "https://placehold.co/40x40.png",
      aiHint: "person thinking"
    },
    content: "The 'Know Your Why' module was a game changer. Really digging deep into my motivations. Highly recommend!",
    likes: 210,
    comments: [],
    time: "1d ago"
  },
  {
    id: 4,
    user: {
      name: "David Kim",
      avatar: "https://placehold.co/40x40.png",
      aiHint: "man portrait"
    },
    content: "Just launched our new product after months of hard work. So proud of the team! #startup #entrepreneur",
    image: "https://placehold.co/600x400.png",
    imageAiHint: "team launch",
    likes: 301,
    comments: [],
    time: "3d ago",
    communityId: 3
  }
];

export const posts: Post[] = initialPosts;
