"use client";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

const Signup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an Account</h2>
          <p className="mt-2 text-muted-foreground">Join our community and start discovering events</p>
        </div>
        <AuthForm />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
