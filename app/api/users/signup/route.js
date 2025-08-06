import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/user.model.js";
import connectToDB from "../../../../dbConfig/dbConnect.js";

connectToDB();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const { email, username, password } = body;

    // if ([email, username, password].some((field) => !field?.trim())) {
    if ([email, password].some((field) => !field?.trim())) {
      return NextResponse.json(
        { message: "Some of the fields are missing" },
        { status: 400 }
      );
    }

    const ifUserExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (ifUserExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({ email, username, password });

    return NextResponse.json(
      { user, message: "User Signup Successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
