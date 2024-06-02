import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "Post" },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Like", likeSchema);
