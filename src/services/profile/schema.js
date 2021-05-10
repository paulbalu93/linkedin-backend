import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String },
    experience: {
      role: {
        type: String,
      },
      company: {
        type: String,
      },
      startDate: {
        type: String,
      },
      endDate: {
        type: String,
      },
      description: {
        type: String,
      },
      area: {
        type: String,
      },
      username: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default model("profile", profileSchema);
