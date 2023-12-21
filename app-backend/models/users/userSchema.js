const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		firstName: { type: String, required: true },
		middleName: { type: String },
		lastName: { type: String },
		phone: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String },
		token: { type: String },
		isPrivate: { type: Boolean, default: false },
		// joiningDate: new Date(),
		profileImage: {
			type: String,
			default:
				"https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg",
		},
		coverImage: {
			type: String,
			default:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSnUwLgruKq7x5Sru9KCilHoFwBGYSyaU7-Q&usqp=CAU",
		},
		followers: [],
		following: [],
		notifications: [],
		bio:{type:String}
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
