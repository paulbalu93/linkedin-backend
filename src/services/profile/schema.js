import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    firstName: { type: String, required: false },
    surname: { type: String, required: false },
    email: { type: String, required: true },
    bio: { type: String, required: false },
    username: { type: String, required: true },
    image: { type: String },
    experiences: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
  },
  { timestamps: true }
);

export default model("profile", profileSchema);
