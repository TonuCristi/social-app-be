import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: String,
    comment_id: { type: Schema.Types.ObjectId, ref: "Comment" },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    post_id: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
