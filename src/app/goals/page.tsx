"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, X } from "lucide-react";
import type { Metadata } from "next";

// This is a client component, so we can't use static metadata export.
// We can set the title in the layout or use a custom hook if needed.
// export const metadata: Metadata = {
//   title: "Goals - LockdIn",
// };

export default function GoalsPage() {
  const [open, setOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [habits, setHabits] = useState<string[]>([]);
  const [currentHabit, setCurrentHabit] = useState("");

  const handleAddHabit = () => {
    if (currentHabit.trim() !== "" && !habits.includes(currentHabit.trim())) {
      setHabits([...habits, currentHabit.trim()]);
      setCurrentHabit("");
    }
  };

  const handleRemoveHabit = (habitToRemove: string) => {
    setHabits(habits.filter(habit => habit !== habitToRemove));
  };

  const handleCreateGoal = () => {
    // Here you would typically handle form submission, e.g., send to an API
    console.log({
      goalName,
      goalDescription,
      habits
    });
    // Reset form and close dialog
    setGoalName("");
    setGoalDescription("");
    setHabits([]);
    setCurrentHabit("");
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Goals</h1>
          <p className="text-muted-foreground">Track your short and long-term ambitions.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create a New Goal</DialogTitle>
              <DialogDescription>
                Define your goal and the habits that will help you achieve it.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g., Run a marathon"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-description">Description (Optional)</Label>
                <Textarea
                  id="goal-description"
                  value={goalDescription}
                  onChange={(e) => setGoalDescription(e.target.value)}
                  placeholder="Why is this goal important to you?"
                />
              </div>
              <div className="grid gap-2">
                <Label>Habits</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentHabit}
                    onChange={(e) => setCurrentHabit(e.target.value)}
                    placeholder="e.g., Run 3 times a week"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddHabit();
                        }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddHabit}>
                    Add Habit
                  </Button>
                </div>
                <div className="space-y-2 mt-2">
                  {habits.map((habit, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md bg-muted/50 p-2 pl-3">
                      <span className="text-sm">{habit}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveHabit(habit)} className="h-7 w-7">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleCreateGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Goals</CardTitle>
          <CardDescription>This is where your goals will be displayed. Start by creating a new one!</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="text-center text-muted-foreground py-8">
            <p>You haven't set any goals yet.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
