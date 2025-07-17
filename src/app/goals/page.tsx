
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, X, Target, Flame, Globe, Lock, CheckCircle, RefreshCw, Edit } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useGoals, type Goal, type Habit } from "@/context/goals-context";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


function EditGoalDialog({ goal, onOpenChange }: { goal: Goal, onOpenChange: (open: boolean) => void }) {
    const { updateGoal } = useGoals();
    const { toast } = useToast();
    
    const [goalName, setGoalName] = useState(goal.name);
    const [goalDescription, setGoalDescription] = useState(goal.description);
    const [habits, setHabits] = useState<Habit[]>(goal.habits);
    const [currentHabit, setCurrentHabit] = useState("");
    const [isPublic, setIsPublic] = useState(goal.isPublic);

    const handleAddHabit = () => {
        if (currentHabit.trim() !== "" && !habits.some(h => h.text === currentHabit.trim())) {
            setHabits([...habits, { id: Date.now(), text: currentHabit.trim() }]);
            setCurrentHabit("");
        }
    };

    const handleRemoveHabit = (habitId: number) => {
        setHabits(habits.filter(habit => habit.id !== habitId));
    };

    const handleUpdateGoal = () => {
        if (!goalName.trim()) {
            toast({ variant: "destructive", title: "Goal Nam* is R*quir*d." });
            return;
        }

        const updatedGoal: Goal = {
            ...goal,
            name: goalName,
            description: goalDescription,
            isPublic: isPublic,
            habits: habits,
        };
        
        updateGoal(updatedGoal);
        toast({ title: "Goal updat*d succ*ssfully!" });
        onOpenChange(false);
    };

    return (
        <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>*dit Goal</DialogTitle>
              <DialogDescription>
                Make changes to your goal and its habits.
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
               <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="public-goal-edit">Public Goal</Label>
                  <p className="text-xs text-muted-foreground">
                    Public goals can be seen by others on your profile.
                  </p>
                </div>
                <Switch
                  id="public-goal-edit"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" onClick={handleUpdateGoal}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default function GoalsPage() {
  const [openNewGoalDialog, setOpenNewGoalDialog] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const [goalName, setGoalName] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentHabit, setCurrentHabit] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { activeGoals, completedGoals, addGoal, checkedHabits, handleHabitCheck, getTodaysDate, completeGoal, keepGoing, deleteGoal } = useGoals();
  const [isClient, setIsClient] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    setIsClient(true);
  }, []);


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
      isPublic: isPublic,
      habits: habits,
      progress: 0,
      streak: 0,
      lastCompleted: null,
      status: 'active',
    };
    
    addGoal(newGoal);
    
    setGoalName("");
    setGoalDescription("");
    setHabits([]);
    setCurrentHabit("");
    setIsPublic(true);
    setOpenNewGoalDialog(false);
  };
  
  const handleDeleteGoal = (goalId: number) => {
    deleteGoal(goalId);
    toast({
        title: "Goal D*l*t*d",
        description: "Your goal has been successfully removed.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Goals</h1>
          <p className="text-muted-foreground">Track your short and long-term ambitions.</p>
        </div>
        <Dialog open={openNewGoalDialog} onOpenChange={setOpenNewGoalDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Cr*at* a N*w Goal</DialogTitle>
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
               <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="public-goal">Public Goal</Label>
                  <p className="text-xs text-muted-foreground">
                    Public goals can be seen by others on your profile.
                  </p>
                </div>
                <Switch
                  id="public-goal"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setOpenNewGoalDialog(false)}>Cancel</Button>
              <Button type="submit" onClick={handleCreateGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-8">
        <Dialog onOpenChange={(isOpen) => !isOpen && setEditingGoal(null)}>
            <Card>
                <CardHeader>
                <CardTitle>Activ* Goals</CardTitle>
                <CardDescription>This is where your goals will be displayed. Start by creating a new one!</CardDescription>
                </CardHeader>
                <CardContent>
                {activeGoals.length === 0 || !isClient ? (
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
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">{goal.name}</h3>
                                        {goal.isPublic ? <Globe className="h-4 w-4 text-muted-foreground" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-semibold">
                                    {goal.streak > 0 && goal.lastCompleted === getTodaysDate() && <Flame className="h-5 w-5 text-orange-500" />}
                                    {goal.progress >= 100 ? (
                                            <Lock className="h-5 w-5 text-accent" />
                                        ) : (
                                            <span>{Math.floor(goal.progress)}%</span>
                                        )}
                                    </div>
                                </div>
                                {goal.description && <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>}
                                <Progress value={goal.progress} className="mt-2 h-2" />
                            </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-8 space-y-4">
                                {goal.status === 'prompt_complete' ? (
                                    <div className="rounded-md border bg-muted/50 p-4 text-center space-y-3">
                                        <h4 className="font-semibold text-lg">You'r* LOCK*D IN!</h4>
                                        <p className="text-muted-foreground text-sm">You've reached 100% on this goal. What's next?</p>
                                        <div className="flex justify-center gap-4 pt-2">
                                            <Button onClick={() => completeGoal(goal.id)}>
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Complete Goal
                                            </Button>
                                            <Button variant="outline" onClick={() => keepGoing(goal.id)}>
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Keep Going
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div>
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
                                                <div className="space-y-2 mt-2">
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
                                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-dashed">
                                             <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setEditingGoal(goal)}>
                                                    <Edit className="mr-2 h-3 w-3" />
                                                    Edit
                                                </Button>
                                            </DialogTrigger>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">
                                                        <Trash2 className="mr-2 h-3 w-3" />
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Ar* you sur*?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your
                                                            goal and all of its data.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteGoal(goal.id)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </>
                                )}
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                )}
                </CardContent>
            </Card>
            {editingGoal && <EditGoalDialog goal={editingGoal} onOpenChange={(isOpen) => !isOpen && setEditingGoal(null)} />}
        </Dialog>
        
        {isClient && completedGoals.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle>Complet*d Goals</CardTitle>
                    <CardDescription>A record of your amazing achievements.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {completedGoals.map(goal => (
                        <div key={goal.id}>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="font-semibold">{goal.name}</p>
                                    {goal.description && <p className="text-sm text-muted-foreground">{goal.description}</p>}
                                </div>
                            </div>
                            <Separator className="my-2" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
