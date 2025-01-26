"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Camera } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { IEvent } from "@/database/eventSchema";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { data: sessionData, status } = useSession();
  const [profileImage, setProfileImage] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState<IEvent[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const fetchUserData = async () => {
      const phoneNumber = sessionData?.phoneNumber || localStorage.getItem("phoneNumber");

      if (!phoneNumber) {
        setError("Phone number is not available.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user data
        const userResponse = await fetch(`/api/user/${phoneNumber}`, {
          method: "GET",
        });

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        setUserData(userData);
        setProfileImage(localStorage.getItem("profilePic") || userData.profileImage || "");

        // Fetch registered events
        const eventsResponse = await fetch("/api/events/registered", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch registered events: ${eventsResponse.statusText}`);
        }

        const eventsData = await eventsResponse.json();
        setRegisteredEvents(eventsData || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to fetch user or event details.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [sessionData]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setProfileImage(imageDataUrl);
        localStorage.setItem("profilePic", imageDataUrl);
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="mt-20 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-4xl font-extrabold text-black">Profile Detail</h1>
      <div className="flex flex-col items-center space-y-6 rounded-lg bg-white p-8 shadow-lg md:flex-row md:items-start md:space-x-8 md:space-y-0">
        {/* Profile Image */}
        <div className="relative h-48 w-48">
          <img
            src={
              profileImage ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="Profile"
            className="h-48 w-48 rounded-full border border-gray-300 object-cover"
          />
          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white"
          >
            <Camera size={20} />
          </label>
          <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>

        {/* Details Container */}
        <div className="flex-grow space-y-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-black">First Name</span>
            <span className="font-semibold text-black">{userData?.firstName || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-bold text-black">Last Name</span>
            <span className="font-semibold text-black">{userData?.lastName || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-bold text-black">Phone Number</span>
            <span className="font-semibold text-black">{userData?.phoneNumber || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-bold text-black">Hobby</span>
            <span className="font-semibold text-black">
              {Array.isArray(userData?.hobbies) && userData.hobbies.length > 0
                ? userData.hobbies.join(", ")
                : "No hobbies yet"}
            </span>
          </div>
          {/* Edit Hobbies */}
          <div className="mt-2 text-right">
            <button className="text-blue-500 hover:underline" onClick={() => router.push("/survey")}>
              Edit Hobby
            </button>
          </div>
        </div>
      </div>

      {/* Completed Events */}
      <div className="mt-12">
        <h2 className="mb-6 text-3xl font-bold text-black">Completed Events</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {registeredEvents.map((event: IEvent, index) => (
            <EventCard key={index} event={event} isRegistered={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
