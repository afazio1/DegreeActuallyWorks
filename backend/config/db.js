const mongoose = require("mongoose");

const connectDB = async () => {

	try {
		await mongoose.connect('mongodb://127.0.0.1/degree-actually-works');
		console.log('MongoDB Connected...');
	}

	catch (error) {
		console.log("Unable to connect to the database", error);
	}
}

module.exports = connectDB;