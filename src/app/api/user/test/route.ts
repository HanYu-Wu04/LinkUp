import connectDB from "@/database/db";
import { User } from "@/database/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phoneNumber } = await req.json();
  await connectDB();
  console.log("hitting server");
  if (!phoneNumber) {
    return NextResponse.json("Invalid input.", { status: 400, statusText: "Missing phone number." });
  }
  const user = await User.findOne({ phoneNumber });
  console.log("user", user);
  return NextResponse.json({ isUser: user !== null });
}
