import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link"; // Use next/link for navigation
import Home from "./app/page"; // Adjust the path for Next.js pages
import Login from "./app/login/page";
import Signup from "./app/signup/page";
import Dashboard from "./app/(home)/dashboard/page";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div>
        {/* Example of Navbar */}
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* The rest of your app content */}
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
