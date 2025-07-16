
export interface Module {
    id: number;
    title: string;
    theme?: string; // This was in the old structure, might need to reconcile
    completed: boolean;
}

export const modules: Module[] = [
  { id: 1, title: "KP God First", theme: "Foundations of Kingdom Principles", completed: true },
  { id: 2, title: "Know Your Why", theme: "Understanding Your Core Motivation", completed: true },
  { id: 3, title: "Ballislife", theme: "Life Lessons from the Court", completed: false },
  { id: 4, title: "The Art of What If", theme: "Vision and Creative Thinking", completed: false },
  { id: 5, title: "Linkdin", theme: "Building Your Professional Network", completed: false },
  { id: 6, title: "Consistency/Discipline", theme: "The Habits of Success", completed: false },
  { id: 7, title: "Authenticity", theme: "Leading with Your True Self", completed: false },
  { id: 8, title: "Togetherness", theme: "The Power of Community", completed: false },
  { id: 9, title: "Perfection", theme: "Striving for Excellence", completed: false },
  { id: 10, title: "What's Your Purpose", theme: "Defining Your Life's Mission", completed: false },
];
