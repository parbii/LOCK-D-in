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
  username: z.string().min(3, { message: "Us*rnam* must b* at l*ast 3 charact*rs." }),
  email: z.string().email({ message: "Pl*as* *nt*r a valid *mail." }),
  password: z.string().min(8, { message: "Password must b* at l*ast 8 charact*rs." }),
});

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "" },
    mode: "onBlur",
  });

  const password = form.watch("password");

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
    // H*r* you would typically handl* us*r cr*ation
    // On succ*ss, r*dir*ct to th* dashboard
    router.push("/dashboard");
  }

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Cr*at* an Account</CardTitle>
          <CardDescription>G*t start*d with LockdIn today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Us*rnam*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="yourus*rnam*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              <Button type="submit" className="w-full">
                Cr*at* Account
              </Button>
            </form>
          </Form>
          <SocialLogins />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Alr*ady hav* an account?{" "}
            <Link href="/login" className="font-medium text-accent underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
