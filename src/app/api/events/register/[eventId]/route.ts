import { auth } from "@/auth";
import connectDB from "@/database/db";
import { Event, User } from "@/database/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  let { register } = await req.json();
  const session = await auth();
  if (!session || !session.user) {
    return { status: 401, json: { success: false, message: "Not authenticated" } };
  }

  const userId = session.objectId;
  await connectDB();
  try {
    if (register) {
      // Add user to event.
      await Event.findByIdAndUpdate(eventId, { $push: { participants: userId } });
      // Add event to user.
      await User.findByIdAndUpdate(userId, { $push: { events: eventId } });
      return NextResponse.json({ success: true });
    } else {
      // Add user to event.
      await Event.findByIdAndUpdate(eventId, { $pull: { participants: userId } });
      // Add event to user.
      await User.findByIdAndUpdate(userId, { $pull: { events: eventId } });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Event registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
