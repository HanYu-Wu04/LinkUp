import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-muted-foreground">Sign in to your account to continue</p>
        </div>
        <AuthForm isLogin />
        <p className="text-center text-sm text-muted-foreground">
          Don&apost have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
