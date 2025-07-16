import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Goals - LockdIn",
};

export default function GoalsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Goals</h1>
          <p className="text-muted-foreground">Track your short and long-term ambitions.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Goals</CardTitle>
          <CardDescription>This is where your goals will be displayed.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Goal management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
