import mongoose from "mongoose";
const { Schema, model } = mongoose;
export const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "profile" },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default model("Post", PostSchema);
