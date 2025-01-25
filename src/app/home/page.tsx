"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="animate-fade-down max-w-3xl space-y-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Discover Amazing Events Near You</h1>
        <p className="text-xl text-muted-foreground">
          Join our community and connect with people who share your interests. Find and attend events that matter to
          you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="button-hover">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="button-hover">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
