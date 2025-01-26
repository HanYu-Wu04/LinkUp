"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventType } from "@/lib/zodEventSchema";
import Select from "react-select"; // React-select for typing and selecting
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "./ui/DateTimePicker";
import MapComponent from "./MapComponent";
import { useSession } from "next-auth/react";

export function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const { data: sessionData } = useSession();

  const form = useForm<EventType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      latitude: 0,
      longitude: 0,
      experienceLevel: "Beginner",
      maxParticipants: 1,
      currentParticipants: 0,
      hobby: "Gaming",
      owner: "test owner",
      description: "",
    },
  });

  const hobbies = [
    { value: "Gaming", label: "Gaming" },
    { value: "Cooking", label: "Cooking" },
    { value: "Hiking", label: "Hiking" },
    { value: "Reading", label: "Reading" },
    { value: "Photography", label: "Photography" },
    { value: "Traveling", label: "Traveling" },
    { value: "Basketball", label: "Basketball" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const phoneNumber = sessionData?.phoneNumber || localStorage.getItem("phoneNumber");

      if (!phoneNumber) {
        setError("Phone number is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/${phoneNumber}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);

        // Dynamically set the owner field in the form
        form.setValue("owner", data._id.toString());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user details.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [sessionData]);

  const handleMapMarkerChange = (lat: number, lng: number) => {
    form.setValue("latitude", lat);
    form.setValue("longitude", lng);
  };

  async function onSubmit(data: EventType) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create event");

      console.log("Event created successfully");
    } catch (error) {
      console.error("Error submitting event:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-screen mx-auto flex h-screen flex-col justify-between rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-8 flex justify-start text-4xl font-extrabold text-gray-800">Create Event</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid flex-grow grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Event Name</FormLabel>
                  <FormControl>
                    <Input className="text-lg" placeholder="Enter event name" {...field} />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">The name of your event.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h2 className="text-lg font-bold text-gray-800">Location</h2>
            <MapComponent onMarkerChange={handleMapMarkerChange} />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" className="text-lg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" className="text-lg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="relative space-y-6">
            <FormField
              control={form.control}
              name="dateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Date/Time</FormLabel>
                  <DateTimePicker className="text-lg" value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Maximum Participants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="text-lg"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    The maximum number of participants for this event.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Current Participants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="text-lg"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    The number of participants currently in the group.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Experience Level</FormLabel>
                  <FormControl>
                    <Input className="text-lg" placeholder="Beginner, Intermediate, or Advanced" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hobby"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Hobby</FormLabel>
                  <Select
                    options={hobbies}
                    defaultValue={{ value: field.value, label: field.value }}
                    onChange={(selected) => form.setValue("hobby", selected ? selected.value : "")}
                    isClearable
                    isSearchable
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Description</FormLabel>
                  <FormControl>
                    <textarea
                      className="h-32 w-full resize-none rounded-lg border border-gray-300 p-2 text-lg"
                      placeholder="Enter event description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-auto flex justify-end">
              <Button type="submit" className="px-6 py-3 text-lg" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
