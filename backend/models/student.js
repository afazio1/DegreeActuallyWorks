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
    ]
});

module.exports = mongoose.model("Student", studentSchema);