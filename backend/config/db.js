const mongoose = require("mongoose");

const connectDB = async () => {

	try {
		await mongoose.connect('mongodb://127.0.0.1/degree-actually-works', {useNewUrlParser: true});
		console.log('MongoDB Connected...');
	}

	catch (error) {
		console.log("Unable to connect to the database", error);
	}
}
const closeDB = async () => {
	await mongoose.connection.close();
	console.log("Connection Closed.");
}

module.exports = { connectDB, closeDB };