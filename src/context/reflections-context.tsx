
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Reflection {
    moduleId: number;
    moduleTitle: string;
    lessonTitle: string;
    reflectionText: string;
    date: string; // ISO string
}

interface ReflectionsContextType {
  reflections: Reflection[];
  addReflection: (reflection: Omit<Reflection, 'date'> & { date?: string }) => void;
}

const ReflectionsContext = createContext<ReflectionsContextType | undefined>(undefined);

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

export const ReflectionsProvider = ({ children }: { children: ReactNode }) => {
  const [reflections, setReflections] = useState<Reflection[]>(() => getFromLocalStorage('reflections', []));

  useEffect(() => {
    localStorage.setItem('reflections', JSON.stringify(reflections));
  }, [reflections]);

  const addReflection = (reflection: Omit<Reflection, 'date'> & { date?: string }) => {
    const newReflection: Reflection = {
      ...reflection,
      date: reflection.date || new Date().toISOString(),
    };
    // Add to the beginning of the array so newest appears first
    setReflections(prevReflections => [newReflection, ...prevReflections]);
  };

  return (
    <ReflectionsContext.Provider value={{ reflections, addReflection }}>
      {children}
    </ReflectionsContext.Provider>
  );
};

export const useReflections = () => {
  const context = useContext(ReflectionsContext);
  if (context === undefined) {
    throw new Error('useReflections must be used within a ReflectionsProvider');
  }
  return context;
};
