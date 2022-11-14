const mongoose = require("mongoose");
const Course = require("../models/course");

const studentSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    major: {
        type: [String],
        required: true
    },
    earnedCredits: {
        type: Number,
        required: true
    },
    gpa: {
        type: Number,
        required: true
    },
    coursesTaken: [
        {
            type: String,
            ref: 'Course',
            semester: {
                type: String,
                required: true
            },
            grade: String
        }
    ] //query this, check if it has a grade -> if not, it's in progress
});

module.exports = mongoose.model("Student", studentSchema);