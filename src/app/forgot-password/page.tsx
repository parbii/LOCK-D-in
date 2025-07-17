"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthLayout from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Pl*as* *nt*r a valid *mail." }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log(values);
    // H*r* you would typically handl* s*nding a password r*s*t link
    toast({
      title: "Password R*s*t Link S*nt",
      description: `If an account *xists for ${values.email}, you will r*c*iv* an *mail with r*s*t instructions.`,
    });
    form.reset();
  }

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Forgot Your Password?</CardTitle>
          <CardDescription>
            No probl*m. *nt*r your *mail and w*'ll s*nd you a r*s*t link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="nam*@*xampl*.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                S*nd R*s*t Link
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/login" className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
