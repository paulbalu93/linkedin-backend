import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ExperienceSchema = new Schema({
  role: "CTO",
  company: "Strive School",
  startDate: "2019-06-16T22:00:00.000Z",
  endDate: "2019-06-16T22:00:00.000Z",
  description: "Doing stuff here and there",
  area: "Berlin",
});

export default model("Experience", ExperienceSchema);
