import mongoose, { Schema, Document, model } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  published: boolean;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.models.Post || model<IPost>("Post", PostSchema);
