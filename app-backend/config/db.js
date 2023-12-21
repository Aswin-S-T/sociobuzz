const mongoose = require("mongoose");
const dbUrl =
	"mongodb+srv://aswins:QVt4gYZyF2ATEjeh@cluster0.5pavcbi.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

module.exports.connect = async () => {
	try {
		mongoose.set("strictQuery", false);
		mongoose.connect(dbUrl);
		console.log("Database connected");
	} catch (error) {
		console.log(error);
		process.exit();
	}
};
