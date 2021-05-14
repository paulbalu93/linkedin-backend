import mongoose from "mongoose";
const { Schema, model } = mongoose;
const experienceSchema = new Schema({
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
});
const profileSchema = new Schema(
  {
    firstName: { type: String, required: false },
    surname: { type: String, required: false },
    email: { type: String, required: true },
    bio: { type: String, required: false, default: "public figure" },
    username: { type: String, required: true },
    image: { type: String, default: "https://picsum.photos/200/300" },
    password: {
      type: String,
      required: true,
    },
    experience: [experienceSchema],
  },
  { timestamps: true }
);

export default model("profile", profileSchema);
