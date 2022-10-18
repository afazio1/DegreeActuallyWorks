const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    GTID: {
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
    major: {
        type: String,
        required: true
    },
    earnedCredits: {
        type: Number,
        required: true
    },
    GPA: {
        type: Number,
        required: true
    },
    coursesTaken: { /* these will correspond to ID identifiers*/
        type: [{String, String, Number}],
        required: true
    }
});
module.exports = mongoose.model("Student", courseSchema);