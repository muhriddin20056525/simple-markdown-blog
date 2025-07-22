import mongoose from "mongoose";

let isConnected: boolean = false;

let MONGO_URI = process.env.MONGODB_URI;

export async function connectToDb() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongodb connection is already exist");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI || "", {
      dbName: "Netflix-Analog",
    });

    isConnected = true;
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(`Mongodb connection error ${error}`);
  }
}
