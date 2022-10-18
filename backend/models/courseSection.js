const mongoose = require("mongoose");

const courseSectionSchema = new mongoose.Schema({
    courseSectionID: {
        type: String,
        required: true
    },
    courseID: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    professorName: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("CourseSection", courseSectionSchema);