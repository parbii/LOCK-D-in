
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, X, Target, Flame } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useGoals, type Goal, type Habit } from "@/context/goals-context";
import { Progress } from "@/components/ui/progress";

export default function GoalsPage() {
  const [open, setOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentHabit, setCurrentHabit] = useState("");
  const { activeGoals, addGoal, checkedHabits, handleHabitCheck, getTodaysDate } = useGoals();

  const handleAddHabit = () => {
    if (currentHabit.trim() !== "" && !habits.some(h => h.text === currentHabit.trim())) {
      setHabits([...habits, { id: Date.now(), text: currentHabit.trim() }]);
      setCurrentHabit("");
    }
  };

  const handleRemoveHabit = (habitId: number) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const handleCreateGoal = () => {
    if (!goalName.trim()) return; 

    const newGoal: Goal = {
      id: Date.now(),
      name: goalName,
      description: goalDescription,
      habits: habits,
      progress: 0,
      streak: 0,
      lastCompleted: null,
    };
    
    addGoal(newGoal);
    
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
                  {habits.map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between rounded-md bg-muted/50 p-2 pl-3">
                      <span className="text-sm">{habit.text}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveHabit(habit.id)} className="h-7 w-7">
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
           {activeGoals.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
                <p>You haven't set any goals yet.</p>
            </div>
           ) : (
            <Accordion type="single" collapsible className="w-full">
              {activeGoals.map(goal => (
                <AccordionItem value={`item-${goal.id}`} key={goal.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3 flex-1">
                      <Target className="h-5 w-5 text-accent" />
                      <div className="flex-1 text-left">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{goal.name}</h3>
                            <div className="flex items-center gap-2 text-sm font-semibold">
                               {goal.streak > 0 && goal.lastCompleted === getTodaysDate() && <Flame className="h-5 w-5 text-orange-500" />}
                               <span>{Math.floor(goal.progress)}%</span>
                            </div>
                        </div>
                        {goal.description && <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>}
                         <Progress value={goal.progress} className="mt-2 h-2" />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-8 space-y-3">
                        <div className="flex justify-between items-center">
                             <h4 className="font-medium">Daily Habits:</h4>
                             {goal.streak > 0 && (
                                <div className="flex items-center gap-1.5 text-orange-500 font-semibold text-sm">
                                    <Flame className="h-4 w-4" />
                                    <span>{goal.streak} day streak!</span>
                                </div>
                             )}
                        </div>
                        {goal.habits.length > 0 ? (
                           <div className="space-y-2">
                                {goal.habits.map(habit => (
                                    <div key={habit.id} className="flex items-center space-x-3">
                                        <Checkbox
                                          id={`habit-${habit.id}`}
                                          checked={checkedHabits[habit.id] || false}
                                          onCheckedChange={() => handleHabitCheck(habit.id, goal.id)}
                                          disabled={goal.lastCompleted === getTodaysDate()}
                                        />
                                        <label
                                            htmlFor={`habit-${habit.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {habit.text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No habits linked to this goal yet.</p>
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
