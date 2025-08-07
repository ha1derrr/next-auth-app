import jwt from "jsonwebtoken";

export const getDataFromToken = async (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    return decodedInfo._id;
  } catch (error) {
    console.log("Error while fetching token data");
    throw new Error(error.message);
  }
};
