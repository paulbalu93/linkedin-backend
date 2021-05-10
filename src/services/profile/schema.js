import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    username: { type: String, required: true },
    experiences: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    // purchaseHistory: [{ asin: String, title: String, price: Number, category: String }],
  },
  { timestamps: true }
);

export default model("profile", profileSchema);
