"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const AuthForm = ({ isLogin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate authentication
    toast({
      title: isLogin ? "Welcome back!" : "Account created successfully!",
      description: "Redirecting to dashboard...",
    });

    setTimeout(() => {
      router.push("/dashboard"); // Navigate using useRouter
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up space-y-6">
      {!isLogin && (
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
            placeholder="John Doe"
          />
        </div>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          placeholder="john@example.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full"
          placeholder="••••••••"
        />
      </div>
      <Button type="submit" className="button-hover w-full">
        {isLogin ? "Sign In" : "Create Account"}
      </Button>
    </form>
  );
};
