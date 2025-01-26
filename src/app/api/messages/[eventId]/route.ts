import connectDB from "@/database/db";
import Message from "@/database/messageSchema";
import { Event } from "@/database/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  await connectDB();
  const event = await Event.findById(eventId).populate("messages");
  console.log(event);
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
  const messages = event.messages;

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  await connectDB();
  const body = await req.json();
  const resp = await Message.create(body);
  // Add message to event
  await Event.findByIdAndUpdate(eventId, { $push: { messages: resp._id } });
  console.log("Message created:", resp);
  return NextResponse.json(resp);
}
