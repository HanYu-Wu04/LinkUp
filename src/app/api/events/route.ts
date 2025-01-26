import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import { Event } from "@/database/index";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();
  const events = await Event.find({});
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const eventData = await request.json();
    const newEventData = {
      name: eventData.name || "", // Default to empty string if not provided
      description: eventData.description || null, // Default to null
      hobby: eventData.hobby || null, // Default to null
      owner: eventData.owner || null, // Default to null (MongoDB ObjectId expected)
      participants: Array.isArray(eventData.participants)
        ? eventData.participants.map((p) => new mongoose.Types.ObjectId(p))
        : [],
      startingParticipants: eventData.startingParticipants || 0, // Default to 0
      capacity: eventData.maxParticipants || 1, // Use maxParticipants as capacity
      date: eventData.date || new Date(), // Default to the current date
      location:
        eventData.latitude && eventData.longitude
          ? {
              type: "Point",
              coordinates: [parseFloat(eventData.longitude), parseFloat(eventData.latitude)],
            }
          : null, // Default to null if latitude or longitude are missing
      imageUrl: eventData.imageUrl || null, // Default to null
      attendees: Array.isArray(eventData.attendees)
        ? eventData.attendees.map((id) => new mongoose.Types.ObjectId(id))
        : [],
      isRecommended: eventData.isRecommended || false, // Default to false
    };
    const event = new Event(newEventData);
    await event.save();
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event", details: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();
  const { id, ...updateData } = await request.json();
  const event = await Event.findByIdAndUpdate(id, updateData, { new: true });
  return NextResponse.json(event);
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const { id } = await request.json();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event deleted successfully" });
}
