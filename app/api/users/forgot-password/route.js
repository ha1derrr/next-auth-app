import { NextResponse } from "next/server";
import connectToDB from "../../../../dbConfig/dbConnect";
import User from "../../../models/user.model.js";
import sendMail from "../../../../helpers/getTokenData";

connectToDB();
export async function POST(req) {
  try {
    const { email, newPassword } = await req.json();
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    // The below code helps to skip the extra db call
    const userObject = user.toObject();
    delete userObject.password;
    return NextResponse.json(
      { message: "Password Updated Successfully", data: userObject },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
