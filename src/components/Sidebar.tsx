"use client";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DarkModeToggle from "./DarkModeToggle";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState({
    name: "Loading...",
    phoneNumber: "Loading...",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", // Default profile picture
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const phoneNumber = "user-phone-number"; // You can get this dynamically from session or context

        const response = await fetch(`/api/user/userInfo/route.ts?reqPhoneNumber=${phoneNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        setUserData({
          name: `${data.firstName} ${data.lastName}`,
          phoneNumber: data.phoneNumber || "No Phone Number Provided",
          profileImage: data.profileImage || "defaultImageURL", // Adjust as needed
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const links = [
    { icon: User, label: "View Profile", path: "/profile" },
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
  ];

  return (
    <div className="animate-slide-in h-screen w-64 border-r bg-white p-6">
      <div className="mb-8 flex items-center space-x-3">
        <Image
          src={userData.profileImage}
          alt={`${userData.name}'s Profile`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{userData.name}</h3>
          <p className="text-sm text-muted-foreground">{userData.phoneNumber}</p>
        </div>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              "flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors",
              pathname === link.path ? "bg-secondary text-primary" : "hover:bg-secondary/50 text-muted-foreground",
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <DarkModeToggle />
      </div>
    </div>
  );
};
