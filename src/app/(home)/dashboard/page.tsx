"use client";

import { EventCard } from "@/components/EventCard";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IEvent } from "@/database/eventSchema";

const Dashboard = () => {
  const [yourEvents, setYourEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);

        let response = await fetch("/api/events/registered", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        let data = await response.json();
        setYourEvents(data);

        response = await fetch("/api/events/unregistered", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        data = await response.json();
        setAllEvents(data || []);
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

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Your Events</h2>
            {yourEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {yourEvents.map((event: IEvent, index) => (
                  <EventCard key={index} event={event} isRegistered />
                ))}
              </div>
            ) : (
              <p>No events found.</p>
            )}
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold">AI Recommended Events</h2>
            {allEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allEvents.map((event: any, index) => (
                  <EventCard key={index} event={event} />
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
                  <EventCard key={index} event={event} />
                ))}
              </div>
            ) : (
              <p>No events found.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
