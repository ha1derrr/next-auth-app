import { NextResponse } from "next/server";
import connectToDB from "../../../../dbConfig/dbConnect";
import { getDataFromToken } from "../../../../helpers/getTokenData";
import User from "../../../models/user.model";

connectToDB();

export async function GET(req) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User found", user: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
