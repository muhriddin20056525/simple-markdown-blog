import { Schema, Document, model, models, Types } from "mongoose";

export interface IComment extends Document {
  content: string;
  post: Types.ObjectId;
  author: Types.ObjectId;
}

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
const Comment = models.Comment || model<IComment>("Comment", CommentSchema);
export default Comment;
