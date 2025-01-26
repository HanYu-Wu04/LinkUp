"use client";

import { EventCard } from "@/components/EventCard";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { IEvent } from "@/database/eventSchema";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const Dashboard = () => {
  const [yourEvents, setYourEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHobbyDropdown, setShowHobbyDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHobby, setSelectedHobby] = useState("");
  const [radius, setRadius] = useState(50);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Some filtering features may not work.",
            variant: "destructive",
          });
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation. Some filtering features may not work.",
        variant: "destructive",
      });
    }
  }, []);

  useEffect(() => {
    let result = allEvents;

    // Filter by hobby
    if (selectedHobby) {
      result = result.filter((event) => event.hobby === selectedHobby);
    }

    // Filter by radius
    if (userLocation.lat !== 0 && userLocation.lng !== 0) {
      result = result.filter((event) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          event.location.coordinates[1],
          event.location.coordinates[0],
        );
        return distance <= radius;
      });
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
  }, [selectedHobby, searchTerm, allEvents, radius, userLocation]);

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

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d * 0.621371; // Convert to miles
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const hobbies = ["Hiking", "Gardening", "Coding", "Reading"];

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
                    <Button onClick={() => setShowHobbyDropdown(!showHobbyDropdown)} variant="outline">
                      {selectedHobby || "Filter by Hobby"}
                      <Filter className="ml-2 h-4 w-4" />
                    </Button>
                    {showHobbyDropdown && (
                      <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg">
                        <Button
                          onClick={() => {
                            setSelectedHobby("");
                            setShowHobbyDropdown(false);
                          }}
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Clear Filter
                        </Button>
                        {hobbies.map((hobby, index) => (
                          <Button
                            key={index}
                            onClick={() => {
                              setSelectedHobby(hobby);
                              setShowHobbyDropdown(false);
                            }}
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            {hobby}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Radius Filter */}
                  <div className="flex items-center space-x-2">
                    <span>Radius:</span>
                    <Slider
                      value={[radius]}
                      onValueChange={(value) => setRadius(value[0])}
                      max={50}
                      step={1}
                      className="w-32"
                    />
                    <span>{radius} miles</span>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mb-2 mt-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredEvents.length} events within {radius} miles of your location.
                </p>
                {userLocation.lat === 0 && userLocation.lng === 0 && (
                  <p className="text-sm text-yellow-600">
                    Note: Location services are not available. The radius filter may not work correctly.
                  </p>
                )}
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
