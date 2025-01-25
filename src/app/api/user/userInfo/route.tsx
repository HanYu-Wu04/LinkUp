import { prisma } from "@/app/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const reqEmail = searchParams.get("reqEmail");
  const session = await auth();

  if (!reqEmail) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  if (session.user.email !== reqEmail) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: reqEmail,
      },
      select: {
        id: true,
        userName: true,
        bio: true,
        posts: true,
        friends: {
          select: {
            id: true,
          },
        },
        email: true,
        name: true,
        Categories: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      console.error("Validation error:", error.message);
      return NextResponse.json({ error: "Validation error", details: error.message }, { status: 400 });
    }

    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
