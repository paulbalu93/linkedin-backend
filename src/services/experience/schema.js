import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ExperienceSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://picsum.photos/200",
    },
  },
  { timestamps: true }
);

export default model("Experience", ExperienceSchema);
