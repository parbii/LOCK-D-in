
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
  isPublic: boolean;
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

// Function to safely get items from localStorage
const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
        return defaultValue;
    }
};


export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [activeGoals, setActiveGoals] = useState<Goal[]>(() => getFromLocalStorage('activeGoals', []));
  const [checkedHabits, setCheckedHabits] = useState<Record<number, boolean>>({});

  const getTodaysDate = getTodaysDateString;
  
  // Effect to load initial state and reset checkboxes daily
  useEffect(() => {
    // Load goals from localStorage on mount
    const storedGoals = getFromLocalStorage('activeGoals', []);
    setActiveGoals(storedGoals);

    // Daily reset logic for checked habits
    const todayStr = getTodaysDate();
    const lastCheckDate = getFromLocalStorage('lastCheckDate', null);

    if (lastCheckDate !== todayStr) {
      setCheckedHabits({});
      localStorage.setItem('lastCheckDate', JSON.stringify(todayStr));
    } else {
      const storedCheckedHabits = getFromLocalStorage('checkedHabits', {});
      setCheckedHabits(storedCheckedHabits);
    }
  }, []);

  // Effect to save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('activeGoals', JSON.stringify(activeGoals));
  }, [activeGoals]);


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

    const goal = activeGoals.find(g => g.id === goalId);
    if (!goal) return;

    // We need to wait for the state to update before checking all habits
    // So we use the newCheckedState directly
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
            
            const baseProgress = 1; 
            const boostFactor = Math.pow(1.05, newStreak - 1);
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
