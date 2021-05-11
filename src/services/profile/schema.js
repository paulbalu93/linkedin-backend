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
    password: {
      type: String,
      required: true,
    },
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
