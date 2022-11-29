const mongoose = require("mongoose");
const Requirement = require('./requirement')

const requirementGroupSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    creditsRequired: {
        type: Number,
        required: true
    },
    children: {
        type: [{
            type: String,
            ref: Requirement,
            required: true
        }],
        required: true
    },
});

module.exports = mongoose.model("RequirementGroup", requirementGroupSchema);