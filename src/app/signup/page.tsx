"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AuthLayout from "@/components/auth-layout";
import { PasswordStrength } from "@/components/password-strength";
import { SocialLogins } from "@/components/social-logins";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const password = form.watch("password");

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
    // Here you would typically handle user creation
    // On success, redirect to the dashboard
    router.push("/dashboard");
  }

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Get started with AuthZen today</CardDescription>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <PasswordStrength password={password} />

              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Create Account
              </Button>
            </form>
          </Form>
          <SocialLogins />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" passHref legacyBehavior>
              <a className="font-medium text-primary underline-offset-4 hover:underline">
                Sign in
              </a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
