
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Module {
    id: number;
    title: string;
    theme?: string;
    completed: boolean;
}

const initialModules: Module[] = [
  { id: 1, title: "KP God First", theme: "Foundations of Kingdom Principles", completed: false },
  { id: 2, title: "Know Your Why", theme: "Understanding Your Core Motivation", completed: false },
  { id: 3, title: "Ball Is Life", theme: "Life Lessons from the Court", completed: false },
  { id: 4, title: "The Art of What If", theme: "Vision and Creative Thinking", completed: false },
  { id: 5, title: "LinkedIn", theme: "Building Your Professional Network", completed: false },
  { id: 6, title: "Consistency and Discipline", theme: "The Habits of Success", completed: false },
  { id: 7, title: "Authenticity", theme: "Leading with Your True Self", completed: false },
  { id: 8, title: "Togetherness", theme: "The Power of Community", completed: false },
  { id: 9, title: "Perfection", theme: "Striving for Excellence", completed: false },
  { id: 10, title: "What's Your Purpose", theme: "Defining Your Life's Mission", completed: false },
];

// --- New Context for Modules ---

interface ModulesContextType {
  modules: Module[];
  completeModule: (moduleId: number) => void;
  resetModules: () => void;
}

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

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

export const ModulesProvider = ({ children }: { children: ReactNode }) => {
  const [modules, setModules] = useState<Module[]>(() => 
    getFromLocalStorage('modules', initialModules)
  );

  useEffect(() => {
    // Sync with localStorage on initial load in case of updates
    const storedModules = getFromLocalStorage('modules', initialModules);
    // This simple merge ensures new modules from code are added
    // and existing user progress is kept.
    const updatedModules = initialModules.map(initialModule => {
      const stored = storedModules.find(m => m.id === initialModule.id);
      return stored ? { ...initialModule, completed: stored.completed } : initialModule;
    });
    setModules(updatedModules);
  }, []);

  useEffect(() => {
    localStorage.setItem('modules', JSON.stringify(modules));
  }, [modules]);

  const completeModule = (moduleId: number) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId ? { ...module, completed: true } : module
      )
    );
  };

  const resetModules = () => {
    setModules(initialModules);
    localStorage.removeItem('modules');
  };

  return (
    <ModulesContext.Provider value={{ modules, completeModule, resetModules }}>
      {children}
    </ModulesContext.Provider>
  );
};

export const useModules = () => {
  const context = useContext(ModulesContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModulesProvider');
  }
  return context;
};
