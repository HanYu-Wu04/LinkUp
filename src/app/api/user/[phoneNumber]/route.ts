import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { phoneNumber: string } }) {
  try {
    // Connect to the database
    await connectDB();

    // Extract phoneNumber from params
    const { phoneNumber } = params;

    // Query the database for the user by phoneNumber
    const user = await User.findOne({ phoneNumber });

    // If user is not found, return 404
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the found user
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
