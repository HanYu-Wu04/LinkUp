"use client";

import { Sidebar } from "@/components/Sidebar";
import { EventCard } from "@/components/EventCard";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [yourEvents, setYourEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: "user-phone-number" }), // Replace with actual user's phone number
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await response.json();
        setYourEvents(data.yourEvents || []);
        setRecommendedEvents(data.recommendedEvents || []);
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  // Combine yourEvents and recommendedEvents to display under "All Events"
  const allEvents = [...yourEvents, ...recommendedEvents];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-5xl space-y-12">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              <section className="space-y-6">
                <h2 className="text-3xl font-bold">Your Events</h2>
                {yourEvents.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {yourEvents.map((event: any, index) => (
                      <EventCard key={index} title={event.title} date={event.date} description={event.description} />
                    ))}
                  </div>
                ) : (
                  <p>No events found.</p>
                )}
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-bold">AI Recommended Events</h2>
                {recommendedEvents.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recommendedEvents.map((event: any, index) => (
                      <EventCard key={index} title={event.title} date={event.date} description={event.description} />
                    ))}
                  </div>
                ) : (
                  <p>No recommended events at the moment.</p>
                )}
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-bold">All Events</h2>
                {allEvents.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allEvents.map((event: any, index) => (
                      <EventCard key={index} title={event.title} date={event.date} description={event.description} />
                    ))}
                  </div>
                ) : (
                  <p>No events found.</p>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
