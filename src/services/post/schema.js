import mongoose from "mongoose";
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
export const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "profile",
    },
    image: {
      type: String,
      default: "https://picsum.photos/200",
    },
  },
  { timestamps: true }
);
export default model("Post", PostSchema);
