const express = require("express");
const connectDB = require("./config/db");
const app = express();
const mongoose = require('mongoose');
const connectDB = require("./config/db.js");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
connectDB();
const Course = require("./models/course");
const CourseSection = require("./models/courseSection");
const Student = require("./models/student");
const { response } = require('express');

connectDB();

connectDB();

// app.get("/courseSections/:courseSectionID", async (req, res) => { //access user_id with req.params.user_id
//     await Course.findOne({ id: req.params.courseSectionID }, (err, result) => {
//         if (err) {
//             console.log("There was an error processing the /courseSections/:courseSectionID request");
//         } else if (!result) {
//             console.log("No course exists matching the ID given.");
//         } else {
//             res.send(result);
//         }
//     });
// });

app.get("/courseID", async (req, res) => { //access user_id with req.params.user_id
    await Course.findOne({ id: req.params.id }, (err, result) => {
        if (err) {
            console.log("There was an error processing the /courseID request");
        } else if (!result) {
            console.log("No course exists matching the ID given.");
        } else {
            res.send(result);
        }
    });
});

app.get("/studentID", async (req, res) => {
    await Student.findOne({ GTID: req.body.GTID }, (err, result) => {
        let response;
        if (err) {
            console.log("There was an error finding a student. Please check server.js");
        } else if (!result) {
            console.log("No student exists matching the ID given.");
        } else {
            res.send(result);
        }
    })
})

//Basic Post Methods
app.post("/createstudent", async (req, res) => {
    await Student.findOne({ GTID: req.body.GTID }, (err, result) => {
        let response;
        if (err) {
            response = "There was an error finding a student. Please check server.js";
        } else if (result) {
            response = "This student already exists. Try using an update post API instead.";
        } else {
            const newStudent = new Student({
                GTID: req.body.GTID,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                major: req.body.major,
                earnedCredits: req.body.earnedCredits,
                GPA: req.body.GPA
            });
            newStudent.save();
            response = "New student added successfully!";
        }
        console.log(response);
        res.send({ message: response });
    });
});

app.post("/createcourse", async (req, res) => {
    await Student.findOne({ id: req.params.id }, (err, result) => {
        let response;
        if (err) {
            response = "There was an error finding a course. Please check server.js";
        } else if (result) {
            response = "This course already exists. Try using an update post API instead.";
        } else {
            const newCourse = new Student({
                courseID: req.body.courseID,
                name: req.body.name,
                creditHours: req.body.creditHours,
                department: req.body.department,
                description: req.body.description,
                prerequisites: req.body.prerequisites
            });
            newCourse.save();
            response = "New course added successfully!";
        }
        console.log(response);
        res.send({ message: response });
    });
});

app.post("/studentcourses/:GTID", async (req, res) => { //needs to be modified, querying student.js for all courses
    const student = await Student.findOne({ GTID: req.params.GTID });
    var allCourse = Array[student.coursesTaken.length];
    var ip = Array[student.coursesTaken.length];
    var taken = Array[student.coursesTaken.length]
    for (let i = 0; i < array.length; i++) {
        if (allCourse[i].equals("") || allCourse[i] == null) {
            ip[i] = student.coursesTaken[i];
        } else {
            taken[i] = student.coursesTaken[i];
        }
    }
    res.send({ message: ip });
    res.send({ message: taken });
});

//TODO (once we have a schema?)
//courses in progress
//courses taken
//requirements based on majors
//^ comes from GT CS degree info
//setup POST, GET, PUT

app.get("/", (req, res) => {
    //insert homepage
});

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    if (err) { return console.log(err); }
    console.log("Express Server listening on port " + port);
});
