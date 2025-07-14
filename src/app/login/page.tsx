"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AuthLayout from "@/components/auth-layout";
import { SocialLogins } from "@/components/social-logins";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    // Here you would typically handle authentication
    // On success, redirect to the dashboard
    router.push("/dashboard");
  }

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="/forgot-password" passHref legacyBehavior>
                        <a className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                          Forgot password?
                        </a>
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Sign In
              </Button>
            </form>
          </Form>
          <SocialLogins />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" passHref legacyBehavior>
              <a className="font-medium text-primary underline-offset-4 hover:underline">
                Sign up
              </a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
