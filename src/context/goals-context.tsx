
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
  status?: 'active' | 'prompt_complete' | 'completed';
}

interface GoalsContextType {
  activeGoals: Goal[];
  completedGoals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: number) => void;
  checkedHabits: Record<number, boolean>;
  handleHabitCheck: (habitId: number, goalId: number) => void;
  getTodaysDate: () => string;
  completeGoal: (goalId: number) => void;
  keepGoing: (goalId: number) => void;
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
  const [goals, setGoals] = useState<Goal[]>(() => getFromLocalStorage('allGoals', []));
  const [checkedHabits, setCheckedHabits] = useState<Record<number, boolean>>(() => getFromLocalStorage('checkedHabits', {}));
  
  const activeGoals = goals.filter(g => g.status !== 'completed');
  const completedGoals = goals.filter(g => g.status === 'completed');

  const getTodaysDate = getTodaysDateString;
  
  // Effect to load initial state and reset checkboxes daily
  useEffect(() => {
    // Load goals from localStorage on mount
    const storedGoals = getFromLocalStorage('allGoals', []);
    setGoals(storedGoals);

    // Daily reset logic for checked habits
    const todayStr = getTodaysDate();
    const lastCheckDate = getFromLocalStorage('lastCheckDate', null);

    if (lastCheckDate !== todayStr) {
      setCheckedHabits({});
      localStorage.setItem('checkedHabits', JSON.stringify({}));
      localStorage.setItem('lastCheckDate', JSON.stringify(todayStr));
    } else {
      const storedCheckedHabits = getFromLocalStorage('checkedHabits', {});
      setCheckedHabits(storedCheckedHabits);
    }
  }, []);

  // Effect to save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('allGoals', JSON.stringify(goals));
  }, [goals]);


  const addGoal = (goal: Goal) => {
    setGoals(prevGoals => [...prevGoals, {...goal, status: 'active'}]);
  };
  
  const updateGoal = (updatedGoal: Goal) => {
    setGoals(prevGoals => prevGoals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  const deleteGoal = (goalId: number) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
  };


  const handleHabitCheck = (habitId: number, goalId: number) => {
    const newCheckedState = {
      ...checkedHabits,
      [habitId]: !checkedHabits[habitId]
    };
    
    setCheckedHabits(newCheckedState);
    localStorage.setItem('checkedHabits', JSON.stringify(newCheckedState));

    const goal = goals.find(g => g.id === goalId);
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
    setGoals(prevGoals => prevGoals.map(goal => {
        if (goal.id === goalId && goal.lastCompleted !== todayStr) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            const newStreak = goal.lastCompleted === yesterdayStr ? goal.streak + 1 : 1;
            
            const baseProgress = 1; 
            const boostFactor = Math.pow(1.05, newStreak - 1);
            const progressGained = baseProgress * boostFactor;

            const newProgress = Math.min(100, goal.progress + progressGained);

            // If goal becomes LockdIn, set status to prompt for completion
            const newStatus = newProgress >= 100 && goal.status !== 'prompt_complete' ? 'prompt_complete' : goal.status;
            
            return { ...goal, progress: newProgress, streak: newStreak, lastCompleted: todayStr, status: newStatus };
        }
        return goal;
    }));
  };
  
  const completeGoal = (goalId: number) => {
    setGoals(prevGoals => prevGoals.map(goal =>
      goal.id === goalId ? { ...goal, status: 'completed' } : goal
    ));
  };

  const keepGoing = (goalId: number) => {
    setGoals(prevGoals => prevGoals.map(goal =>
        goal.id === goalId ? { ...goal, status: 'active' } : goal
    ));
  }


  return (
    <GoalsContext.Provider value={{ activeGoals, completedGoals, addGoal, updateGoal, deleteGoal, checkedHabits, handleHabitCheck, getTodaysDate, completeGoal, keepGoing }}>
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
