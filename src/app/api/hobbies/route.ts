import { auth } from "@/auth";
import connectDB from "@/database/db";
import { User } from "@/database/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Hobbies API hit.");

  await connectDB();
  try {
    const body = await req.json();
    const session = await auth();
    const hobbies = body.hobbies.map((hobby: any) => hobby.name);

    if (!session) {
      return NextResponse.json("Unauthorized.", { status: 401 });
    }

    if (!hobbies || hobbies.length < 3) {
      return NextResponse.json("Select at least 3 hobbies.", { status: 400 });
    }

    const phoneNumber = session.phoneNumber;
    const user = await User.findOneAndUpdate({ phoneNumber }, { $set: { hobbies } }, { new: true });

    if (!user) {
      return NextResponse.json("User not found.", { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Hobbies update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
