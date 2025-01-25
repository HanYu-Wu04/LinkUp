"use client";

import { Sidebar } from "@/components/Sidebar";
import { EventCard } from "@/components/EventCard";

const Dashboard = () => {
  const yourEvents = [
    {
      title: "Tech Conference 2024",
      date: "March 15, 2024",
      description: "Join us for the biggest tech conference of the year.",
      isRegistered: true,
    },
    {
      title: "Design Workshop",
      date: "March 20, 2024",
      description: "Learn the latest design trends and techniques.",
      isRegistered: true,
    },
  ];

  const recommendedEvents = [
    {
      title: "AI Summit",
      date: "April 5, 2024",
      description: "Explore the future of artificial intelligence.",
    },
    {
      title: "Startup Networking",
      date: "April 10, 2024",
      description: "Connect with founders and investors.",
    },
    {
      title: "Web Development Bootcamp",
      date: "April 15, 2024",
      description: "Intensive training on modern web development.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Your Events</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {yourEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold">AI Recommended Events</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendedEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
