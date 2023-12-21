const mongoose = require("mongoose");
const profileImageSchema = new mongoose.Schema({
	userId: { type: String, required: true },
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
});
const ProfileImage = mongoose.model("ProfileImage", profileImageSchema);
module.exports = ProfileImage;
