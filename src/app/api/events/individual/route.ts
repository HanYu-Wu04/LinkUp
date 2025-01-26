import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Event from "@/database/eventSchema";
import { auth } from "@/auth";
import User from "@/database/userSchema";

export async function GET() {
  await connectDB();
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }
  const phoneNumber = session.phoneNumber;
  // Get user and their events
  // Filter by events that are not yet over
  const currentDate = new Date();
  console.log(currentDate);
  const allEvents = await User.findOne({ phoneNumber }).populate({ path: "events" }).exec();
  console.log(allEvents.events);
  const events = allEvents.events.filter((event) => event.date >= currentDate);
  // TODO: utilize mongodb query to filter events that are not yet over
  //   const userEvents = await User.findOne({ phoneNumber })
  //     .populate({ path: "events", match: { date: { $lte: currentDate } } })
  //     .exec();
  console.log(events);
  return NextResponse.json(events);
}

// export async function POST(request: Request) {
//   await connectDB();
//   const eventData = await request.json();
//   const event = new Event(eventData);
//   await event.save();
//   return NextResponse.json(event);
// }

// export async function PUT(request: Request) {
//   await connectDB();
//   const { id, ...updateData } = await request.json();
//   const event = await Event.findByIdAndUpdate(id, updateData, { new: true });
//   return NextResponse.json(event);
// }

// export async function DELETE(request: Request) {
//   await connectDB();
//   const { id } = await request.json();
//   await Event.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Event deleted successfully" });
// }
