"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Mail, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();
  
  const handleSupportClick = () => {
    window.location.href = "mailto:support@lockdin.com";
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="profile avatar"/>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
             <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profil*</span>
             </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>S*ttings</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSupportClick}>
            <Mail className="mr-2 h-4 w-4" />
            <span>*mail Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
