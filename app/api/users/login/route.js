import { NextResponse } from "next/server";
import User from "../../../models/user.model";
import sendMail from "../../../../helpers/sendMail/sendMail";
import connectToDB from "../../../../dbConfig/dbConnect";

connectToDB();
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const token = await user.generateToken();

    // Optionally send login email
    // await sendMail({
    //   to: user.email,
    //   subject: "Login Notification",
    //   text: "You just logged in to your account.",
    // });

    const response = NextResponse.json(
      {
        message: "User logged in",
        token,
        email: user.email,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
