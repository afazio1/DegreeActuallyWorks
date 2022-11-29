const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _type: {
        type: String,
        required: false,
        match: /(GPA|Parent|Classes)/
    },
    expression: {
        /*
            _type:         GPA         Parent                                        Classes
            expression:    '4.0'     '<RequirementRefKey>, <RequirementRefKey2>'   'CS 1100 OR (CS 1101 AND CS 1102)'
        */
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Requirement", requirementSchema);