import { prisma } from "@/app/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reqPhoneNumber = searchParams.get("reqPhoneNumber");

    if (!reqPhoneNumber) {
      return NextResponse.json({ success: false, message: "Phone number is required" }, { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    // Additional check to ensure the session phone number matches the requested phone number
    if (session.user.phoneNumber !== reqPhoneNumber) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { phoneNumber: reqPhoneNumber },
      select: {
        firstName: true,
        lastName: true,
        phoneNumber: true,
        profileImage: true,
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in user info route:", error);

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
