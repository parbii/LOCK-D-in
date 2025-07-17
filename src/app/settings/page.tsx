
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const handleSupportClick = () => {
    window.location.href = "mailto:support@lockdin.com";
  };
    
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">S*ttings</h1>
        <p className="text-muted-foreground">Manag* your account and pr*f*r*nc*s.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Account S*ttings</CardTitle>
          <CardDescription>Updat* your profil*, manag* notifications, and mor*.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button variant="outline" asChild className="w-full justify-start text-left">
                <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    *dit Profil*
                </Link>
            </Button>
             <Button variant="outline" onClick={handleSupportClick} className="w-full justify-start text-left">
                <Mail className="mr-2 h-4 w-4" />
                *mail Support
             </Button>
             <Button variant="destructive" asChild className="w-full justify-start text-left">
                <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Link>
             </Button>
        </CardContent>
      </Card>
    </div>
  );
}
