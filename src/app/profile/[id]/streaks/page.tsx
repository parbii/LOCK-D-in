"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FriendStreaksPage() {
    const params = useParams();
    const id = params.id;

    return (
        <div className="space-y-4">
            <Link href={`/profile/${id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Profile
            </Link>
            <Card>
                <CardHeader>
                    <CardTitle>Streaks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This is where details about the user's streaks will be displayed.</p>
                </CardContent>
            </Card>
        </div>
    );
}
