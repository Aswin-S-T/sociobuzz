const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
	{
		userId: { type: String },
		caption: { type: String },
		image: { type: String },
		imageType: { type: String, required: true },
		about: { type: String },
		like: [],
		comment: [],
		share: [],
		time: { type: String },
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
