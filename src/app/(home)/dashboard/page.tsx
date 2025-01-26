"use client";

import { EventCard } from "@/components/EventCard";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IEvent } from "@/database/eventSchema";
import { Filter, Search } from "lucide-react";

const Dashboard = () => {
  const [yourEvents, setYourEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHobbyDropdown, setShowHobbyDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHobby, setSelectedHobby] = useState("");

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
        setFilteredEvents(data || []);
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

  useEffect(() => {
    let result = allEvents;

    // Filter by hobby
    if (selectedHobby) {
      result = result.filter((event) => event.hobby === selectedHobby);
    }

    // Search by event name or description
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTermLower) ||
          event.description.toLowerCase().includes(searchTermLower),
      );
    }

    setFilteredEvents(result);
  }, [selectedHobby, searchTerm, allEvents]);

  const userRegisteredBeaversDayOut = yourEvents.some((event: IEvent) => event.name === "Beavers Day Out");

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
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64">{/* Sidebar content */}</div>

      {/* Main Content */}
      <div className="flex-grow space-y-12 pl-8 pr-8 pt-8">
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
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">All Events</h2>
                <div className="flex items-center space-x-4">
                  {/* Hobby Filter Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowHobbyDropdown(!showHobbyDropdown)}
                      className="rounded-full p-2 hover:bg-gray-200"
                    >
                      <Filter className="h-5 w-5" />
                    </button>
                    {showHobbyDropdown && (
                      <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg">
                        <button
                          onClick={() => {
                            setSelectedHobby("");
                            setShowHobbyDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Clear Filter
                        </button>
                        {hobbies.map((hobby, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedHobby(hobby);
                              setShowHobbyDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            {hobby}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 rounded-md border py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event: any, index) => (
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
    </div>
  );
};

export default Dashboard;
