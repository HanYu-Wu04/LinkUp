"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const hobbies = [
  "Reading",
  "Cooking",
  "Photography",
  "Gaming",
  "Hiking",
  "Music",
  "Art",
  "Sports",
  "Travel",
  "Gardening",
  "Crafting",
  "Fitness",
  "Writing",
  "Movies",
  "Coding",
  "Dancing",
];

export default function HobbySurvey() {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredHobbies = useMemo(
    () => hobbies.filter((hobby) => hobby.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm],
  );

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) => (prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedHobbies.length >= 3) {
      try {
        const response = await fetch("/api/hobbies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hobbies: selectedHobbies.map((name) => ({ name })),
          }),
        });

        if (response.ok) {
          router.push("/dashboard");
        } else {
          // Handle error
          console.error("Failed to update hobbies");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Select Your Hobbies</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Search hobbies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <div className="grid grid-cols-4 gap-2">
              {filteredHobbies.map((hobby) => (
                <Button
                  key={hobby}
                  type="button"
                  variant={selectedHobbies.includes(hobby) ? "default" : "outline"}
                  onClick={() => toggleHobby(hobby)}
                  className="w-full"
                >
                  {hobby}
                </Button>
              ))}
            </div>
            <div className="mt-2 text-center text-sm text-gray-500">
              {selectedHobbies.length} hobbies selected
              {selectedHobbies.length < 3 && " (Minimum 3 required)"}
            </div>
            <Button type="submit" disabled={selectedHobbies.length < 3} className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
