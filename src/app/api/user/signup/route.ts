import connectDB from "@/database/db";
import { User } from "@/database/index";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  console.log("Sign up API hit.");

  await connectDB();
  try {
    const { phoneNumber, password, firstName, lastName, birthDate } = await req.json();
    // TODO: Add birthDate
    if (!phoneNumber || !password || !firstName || !lastName) {
      return NextResponse.json("Invalid input.", { status: 400, statusText: "Invalid input." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return NextResponse.json("User already exists.", { status: 400, statusText: "User already exists." });
    }

    // Hash the password with bcrypt
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create the user in the database
    const user = await User.create({
      phoneNumber,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
