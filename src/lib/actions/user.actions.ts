import React from "react";
import connectDatabase from "../mongoose";
import User, { IUser } from "@/database/user.model";
import { TCreateUserParams } from "@/types";

export default async function createUser(params: TCreateUserParams) {
  try {
    connectDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
