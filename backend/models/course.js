const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creditHours: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    prerequisites: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model("Course", courseSchema);