"use server";
import mongoose from "mongoose";

let isConnect: boolean = false;
export default async function connectDatabase() {
  if (!process.env.MONGODB_URL) {
    throw new Error("Connect to Database fail");
  }
  if (isConnect) {
    console.log("MONGODB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ucademy",
    });
    isConnect = true;
    console.log("Using new db connection");
  } catch (error) {
    console.log(error);
  }
}
