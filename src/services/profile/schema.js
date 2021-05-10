import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const profileSchema = new Schema(
	{
		firstName: { type: String, required: true },
		// lastName: { type: String, required: true },
		// email: { type: String, required: true },
		// age: { type: Number, required: true, min: 18, max: 70, default: 18 },
		// professions: [String],
		// purchaseHistory: [{ asin: String, title: String, price: Number, category: String }],
	},
	{ timestamps: true }
);

export default model('profile', profileSchema);
