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

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/courseSections/:courseSectionID", async (req, res) => { //access user_id with req.params.user_id
  await Course.findOne({ id: req.params.courseSectionID }, (err, result) => {
    if (err) {
      console.log("There was an error processing the /courseSections/:courseSectionID request");
    } else if (!result) {
      console.log("No course exists matching the ID given.");
    } else {
      res.send(result);
    }
  });
});


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
  await Student.findOne({ courseSectonID: req.body.courseID }, (err, result) => {
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
app.post("/createcoursesection", async (req, res) => {
  await Student.findOne({ courseSectionID: req.body.courseSectionID }, (err, result) => {
    let response;
    if (err) {
      response = "There was an error finding a course section. Please check server.js";
    } else if (result) {
      response = "This course section already exists. Try using an update post API instead.";
    } else {
      const newCourseSection = new Student({
        courseSectonID: req.body.courseSectionID,
        courseID: req.body.courseID,
        section: req.body.section,
        professorName: req.body.professorName
      });
      newCourseSection.save();
      response = "New course section added successfully!";
    }
    console.log(response);
    res.send({ message: response });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if (err) { return console.log(err); }
  console.log("Express Server listening on port " + port);
});
