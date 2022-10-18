const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseID: {
        description: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    creditHours: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prerequisites: { 
        type: [String],
        required: true
    }
});


module.exports = mongoose.model("Course", courseSchema);