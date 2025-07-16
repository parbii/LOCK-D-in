"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Habit {
  id: number;
  text: string;
}

export interface Goal {
  id: number;
  name: string;
  description: string;
  habits: Habit[];
}

interface GoalsContextType {
  activeGoals: Goal[];
  addGoal: (goal: Goal) => void;
  checkedHabits: Record<number, boolean>;
  handleHabitCheck: (habitId: number) => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [activeGoals, setActiveGoals] = useState<Goal[]>([]);
  const [checkedHabits, setCheckedHabits] = useState<Record<number, boolean>>({});

  const addGoal = (goal: Goal) => {
    setActiveGoals(prevGoals => [...prevGoals, goal]);
  };

  const handleHabitCheck = (habitId: number) => {
    setCheckedHabits(prev => ({
      ...prev,
      [habitId]: !prev[habitId]
    }));
  };

  return (
    <GoalsContext.Provider value={{ activeGoals, addGoal, checkedHabits, handleHabitCheck }}>
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
