import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json(
    {
      message: "User Logged Out Successfully",
    },
    {
      status: 200,
    }
  );
  response.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
