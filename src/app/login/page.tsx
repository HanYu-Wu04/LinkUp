"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define Zod schema
const signInSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  apiError: z.string().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (data: SignInFormData) => {
    setIsSubmitting(true);

    const response = await fetch("/api/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError("apiError", { type: "manual", message: errorData.error });
      toast({ title: "Error", description: errorData.error, variant: "destructive" });
      setIsSubmitting(false);
    } else {
      toast({ title: "Welcome Back!", description: "Redirecting to dashboard..." });
      await signIn("credentials", {
        redirect: true,
        redirectTo: "/dashboard",
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="phoneNumber">
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber")}
              placeholder="Enter your phone number"
              maxLength={10}
              required
              className="w-full"
            />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              required
              className="w-full"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {errors.apiError && <p className="text-sm text-red-500">{errors.apiError.message}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
