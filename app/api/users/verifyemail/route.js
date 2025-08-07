import { NextResponse } from "next/server";
import connectToDB from "../../../../dbConfig/dbConnect";
import User from "../../../models/user.model.js";

connectToDB();
export async function POST(req) {
  try {
    const body = await req.json();
    const { token } = body;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.save({ validateBeforeSave: false });
    const userObject = user.toObject();
    delete userObject.password;
    return NextResponse.json(
      { message: "Email verified successfully", user: userObject },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
