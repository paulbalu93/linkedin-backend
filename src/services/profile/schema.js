import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Experience from "../experience/schema";
const profileSchema = new Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String },
    experience: [Experience],
  },
  { timestamps: true }
);

export default model("profile", profileSchema);
