import mongoose, { connect, connection } from "mongoose";

const connectToDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
    connection.on("connected", () => {
      console.log("Database Connected Successfully");
    });
    connection.on("error", (e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export default connectToDB;
