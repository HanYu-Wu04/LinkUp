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

  // Check if the user has registered for Beavers Day Out
  const userRegisteredBeaversDayOut = yourEvents.some((event: IEvent) => event.name === "Beavers Day Out");

  // If the user registered for Beavers Day Out, add the new events to the recommended list
  const recommendedEvents = userRegisteredBeaversDayOut
    ? [
        {
          _id: { $oid: "6795a369544b7d5ab20c70d8" },
          name: "Mountain Hiking Adventure",
          description: "Hiking up to a mountain lookout point",
          hobby: "Hiking",
          owner: "679483297f0e476ddc890c3d",
          participants: [],
          startingParticipants: 5,
          capacity: 16,
          date: "2025-03-16T08:00:00.000Z",
          location: {
            type: "Point",
            coordinates: [-111.891047, 40.760779],
          },
          imageUrl: "https://source.unsplash.com/random/200x200/?hiking",
          attendees: [],
        },
        {
          _id: { $oid: "6795a369544b7d5ab20c70dd" },
          name: "Community Gardening Day",
          description: "Planting flowers and vegetables in the local community garden.",
          hobby: "Gardening",
          owner: "679483297f0e476ddc890c3d",
          participants: [],
          startingParticipants: 5,
          capacity: 15,
          date: "2025-03-17T10:00:00.000Z",
          location: {
            type: "Point",
            coordinates: [-77.0369, 38.9072],
          },
          imageUrl: "https://source.unsplash.com/random/200x200/?gardening",
          attendees: [],
        },
        {
          _id: { $oid: "6795a369544b7d5ab20c70e8" },
          name: "Waterfall Hike",
          description: "Scenic hike to a beautiful waterfall",
          hobby: "Hiking",
          owner: "679483297f0e476ddc890c3d",
          participants: [],
          startingParticipants: 2,
          capacity: 14,
          date: "2025-03-17T09:00:00.000Z",
          location: {
            type: "Point",
            coordinates: [-71.0577, 42.3581],
          },
          imageUrl: "https://source.unsplash.com/random/200x200/?hiking",
          attendees: [],
        },
      ]
    : allEvents;

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
            {userRegisteredBeaversDayOut ? (
              recommendedEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {recommendedEvents.map((event: any, index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>
              ) : (
                <p>No recommended events at the moment.</p>
              )
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
