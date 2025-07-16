
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Habit {
  id: number;
  text: string;
}

export interface Goal {
  id: number;
  name: string;
  description: string;
  habits: Habit[];
  progress: number;
  streak: number;
  lastCompleted: string | null; // YYYY-MM-DD
}

interface GoalsContextType {
  activeGoals: Goal[];
  addGoal: (goal: Goal) => void;
  checkedHabits: Record<number, boolean>;
  handleHabitCheck: (habitId: number, goalId: number) => void;
  getTodaysDate: () => string;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const getTodaysDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [activeGoals, setActiveGoals] = useState<Goal[]>([]);
  const [checkedHabits, setCheckedHabits] = useState<Record<number, boolean>>({});

  const getTodaysDate = getTodaysDateString;
  
  // Effect to reset checkboxes daily
  useEffect(() => {
    const todayStr = getTodaysDate();
    const lastCheckDate = localStorage.getItem('lastCheckDate');

    if (lastCheckDate !== todayStr) {
      setCheckedHabits({});
      localStorage.setItem('lastCheckDate', todayStr);
    } else {
      const storedCheckedHabits = localStorage.getItem('checkedHabits');
      if (storedCheckedHabits) {
        setCheckedHabits(JSON.parse(storedCheckedHabits));
      }
    }
  }, []);

  const addGoal = (goal: Goal) => {
    setActiveGoals(prevGoals => [...prevGoals, goal]);
  };

  const handleHabitCheck = (habitId: number, goalId: number) => {
    const newCheckedState = {
      ...checkedHabits,
      [habitId]: !checkedHabits[habitId]
    };
    
    setCheckedHabits(newCheckedState);
    localStorage.setItem('checkedHabits', JSON.stringify(newCheckedState));

    // Check if all habits for the goal are now checked
    const goal = activeGoals.find(g => g.id === goalId);
    if (!goal) return;

    const allHabitsForGoalChecked = goal.habits.every(h => newCheckedState[h.id]);

    if (allHabitsForGoalChecked) {
      updateGoalProgress(goalId);
    }
  };

  const updateGoalProgress = (goalId: number) => {
    const todayStr = getTodaysDate();
    setActiveGoals(prevGoals => prevGoals.map(goal => {
        if (goal.id === goalId && goal.lastCompleted !== todayStr) {
            const newStreak = goal.lastCompleted === new Date(Date.now() - 86400000).toISOString().split('T')[0] ? goal.streak + 1 : 1;
            
            // Exponential boost for consistency
            const baseProgress = 1; // Base 1%
            const boostFactor = Math.pow(1.05, newStreak - 1); // 5% compounding interest on progress
            const progressGained = baseProgress * boostFactor;

            const newProgress = Math.min(100, goal.progress + progressGained);
            
            return { ...goal, progress: newProgress, streak: newStreak, lastCompleted: todayStr };
        }
        return goal;
    }));
  };


  return (
    <GoalsContext.Provider value={{ activeGoals, addGoal, checkedHabits, handleHabitCheck: handleHabitCheck, getTodaysDate }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};
