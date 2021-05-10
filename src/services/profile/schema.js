import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const profileSchema = new Schema(
	{
		firstName: { type: String, required: true },
		surname: { type: String, required: true },
		email: { type: String, required: true },
		bio: { type: String, required: true },
		username: { type: String, required: true },
		experience: [
			{
				role: String,

				company: String,
				startDate: String,
				endDate: String,
				description: String,
				area: String,
				username: String,
				// image: String,
			},
		],
	},
	{ timestamps: true }
);

export default model('profile', profileSchema);
