const mongoose = require("mongoose");
const storySchema = new mongoose.Schema({
	userId: { type: String, required: true },
	story: { type: String },
	username: { type: String },
	createdAt: { type: Date, expires: "24h", default: Date.now },
});

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
