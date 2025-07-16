
"use client";

import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Target, Flame, FileText, Lock } from "lucide-react";
import Link from 'next/link';
import { type Goal } from '@/context/goals-context';

export interface ProfileStatsProps {
    goals: Goal[];
    postsCount: number;
    userId?: string | number; // To build the correct link for friends' profiles
}

export function ProfileStats({ goals, postsCount, userId }: ProfileStatsProps) {
    const totalGoals = goals.length;
    const totalStreaks = goals.reduce((sum, goal) => sum + (goal.streak || 0), 0);
    const lockedInGoals = goals.filter(goal => goal.progress >= 100).length;
    
    const stats = [
      { name: "Goals", value: totalGoals, icon: Target, href: userId ? `/profile/${userId}/goals` : '/goals' },
      { name: "Streaks", value: totalStreaks, icon: Flame, href: userId ? `/profile/${userId}/streaks` : '/streaks' },
      { name: "Posts", value: postsCount, icon: FileText, href: userId ? `/profile/${userId}/posts` : '/feed' },
      { name: "LockdIn", value: lockedInGoals, icon: Lock, href: userId ? `/profile/${userId}/locked` : '/locked-goals' }
    ];
  
    return (
        <div className="flex justify-around rounded-lg bg-muted/50 p-4 w-full max-w-md">
        {stats.map((stat, index) => (
          <React.Fragment key={stat.name}>
            <Link href={stat.href}>
                <div className="flex flex-col items-center gap-2 text-center transition-transform hover:scale-105">
                    <stat.icon className="h-6 w-6 text-muted-foreground" />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.name}</p>
                </div>
            </Link>
            {index < stats.length - 1 && <Separator orientation="vertical" className="h-20" />}
          </React.Fragment>
        ))}
      </div>
    );
}
