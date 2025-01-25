import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Event from "@/database/eventSchema";

export async function GET() {
  await connectDB();
  const events = await Event.find({});
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  await connectDB();
  const eventData = await request.json();
  const event = new Event(eventData);
  await event.save();
  return NextResponse.json(event);
}

export async function PUT(request: Request) {
  await connectDB();
  const { id, ...updateData } = await request.json();
  const event = await Event.findByIdAndUpdate(id, updateData, { new: true });
  return NextResponse.json(event);
}

export async function DELETE(request: Request) {
  await connectDB();
  const { id } = await request.json();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event deleted successfully" });
}
