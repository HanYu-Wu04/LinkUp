"use client";

import { useEffect } from "react";
import { useState } from "react";
import MapComponent from "./MapComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventType } from "@/lib/zodEventSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateTimePicker } from "./ui/DateTimePicker";
import { useSession } from "next-auth/react";

export function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<EventType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      latitude: 0,
      longitude: 0,
      experienceLevel: "Beginner",
      maxParticipants: 1,
      currentParticipants: 0,
      hobby: "test hobby",
      owner: "test owner",
    },
  });

  const { data: sessionData } = useSession();
  const [profileImage, setProfileImage] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data by phone number
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
        setProfileImage(localStorage.getItem("profilePic") || data.profileImage || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user details.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [sessionData]);

  // Callback to sync marker position with the form
  const handleMapMarkerChange = (lat: number, lng: number) => {
    form.setValue("latitude", lat); // Update latitude field
    form.setValue("longitude", lng); // Update longitude field
  };

  async function onSubmit(data: EventType) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const result = await response.json();
      console.log("Event created successfully:", result);

      // Optionally reset the form or display a success message
    } catch (error) {
      console.error("Error submitting event:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const phoneNumber = sessionData?.phoneNumber || localStorage.getItem("phoneNumber");

      if (!phoneNumber) {
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

        // Set user data and update owner in the form
        const ownerId = data._id.toString(); // Ensure you get only the string value of the ObjectId
        setUserData(data);

        // Dynamically set the owner field in the form
        form.setValue("owner", ownerId);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user details.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter event name" {...field} />
              </FormControl>
              <FormDescription>The name of your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hobby"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobby</FormLabel>
              <FormControl>
                <Input placeholder="Enter hobby related to the event" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Map Component */}
        <div>
          <MapComponent onMarkerChange={handleMapMarkerChange} /> {/* Pass callback to MapComponent */}
        </div>
        <div>
          <FormItem>
            <FormLabel>Date/Time</FormLabel>
            <DateTimePicker />
          </FormItem>
        </div>
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Participants</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
              </FormControl>
              <FormDescription>The maximum number of participants for this event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Participants</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
              </FormControl>
              <FormDescription>The number of participants currently in the group.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter event description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </Form>
  );
}
