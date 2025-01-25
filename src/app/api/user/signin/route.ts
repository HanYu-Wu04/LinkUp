import connectDB from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userSchema from "@/database/userSchema";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { phoneNumber, password } = await req.json();
    // Remove any characters that are not numbers
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    if (!cleanedPhoneNumber || !password) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const user = await userSchema.findOne({ phoneNumber }, "id phoneNumber firstName lastName password");

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Invalid password." }, { status: 400 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
