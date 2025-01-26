import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import { User } from "@/database/index";

export async function GET() {
  await connectDB();
  const users = await User.find({});
  console.log(users);
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  await connectDB();
  const userData = await request.json();
  const user = new User(userData);
  await user.save();
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  await connectDB();
  const { id, ...updateData } = await request.json();
  const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  return NextResponse.json(user);
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const { id } = await request.json();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted successfully" });
}
