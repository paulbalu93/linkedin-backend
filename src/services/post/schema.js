import mongoose from "mongoose";
const { Schema, model } = mongoose;
export const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    // user: { type: Schema.Types.ObjectId, required: true, ref: "profile" },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default model("Post", PostSchema);
