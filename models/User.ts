import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  image: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, default: "USER" },
  image: { type: String, required: true },
});

export const UserModel =
  mongoose.models.User || model<IUser>("User", UserSchema);
