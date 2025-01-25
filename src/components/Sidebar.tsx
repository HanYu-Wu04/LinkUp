"use client";
import { usePathname } from "next/navigation"; // Use usePathname from next/navigation
import { Home, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DarkModeToggle from "./DarkModeToggle";
import Image from "next/image";

export const Sidebar = () => {
  const pathname = usePathname(); // Get the current path from the router
  const links = [
    { icon: User, label: "View Profile", path: "/profile" },
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
  ];

  return (
    <div className="animate-slide-in fixed left-0 top-0 h-screen w-64 border-r bg-white p-6">
      <div className="mb-8 flex items-center space-x-3">
        <Image
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          width={48} // Width of the image in pixels
          height={48} // Height of the image in pixels
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              "flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors",
              pathname === link.path
                ? "bg-secondary text-primary" // Active link styles
                : "hover:bg-secondary/50 text-muted-foreground",
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        {" "}
        {/* Place the dark mode toggle at the bottom */}
        <DarkModeToggle />
      </div>
    </div>
  );
};
