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
    level: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    degreeCandidate: {
        type: String,
        required: false
    },
    academicStanding: {
        type: String,
        required: false
    },
    graduationInformation: {
        type: String,
        required: false
    },
    minor: {
        type: [String],
        required: false
    },
    coursesTaken: [
        {
            _id: {
                type: String,
                ref: 'Course',
                required: true
            },
            semester: {
                type: String,
                required: true
            },
            grade: String
        }
    ] //query this, check if it has a grade -> if not, it's in progress
});

module.exports = mongoose.model("Student", studentSchema);