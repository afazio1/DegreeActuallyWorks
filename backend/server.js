const express = require("express");
const { connectDB } = require("./config/db");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Course = require("./models/course");
const Student = require("./models/student");
const Requirement = require('./models/requirement');
const RequirementGroup = require('./models/requirementGroup')

const notFoundError = {
    message: 'Data not found with requested query.'
}, dbError = {
    message: 'There is an error in the database. See server log for more info.'
}, serverError = {
    message: "An error occurred on the server's end. See server log for more info."
};

const allowCORS = res => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

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

app.get('/course', async (req, res) => {
    await Course.find({}, (err, result) => {
        allowCORS(res)
        if (err) {  // This is repetitive. We should have better error handling ~Cynthia
            console.log("There was an error processing request from endpoint /course")
        } else if (!result) {
            console.log("No course exists matching the ID given.");
            res.status(404).json(notFoundError)
        } else {
            res.json(result)
        }
    }).clone().catch(err => {
        console.log(err)
        res.status(500).json(serverError)
    })
})

app.get("/course/:courseID", async (req, res) => { //access user_id with req.params.user_id
    await Course.findOne({ _id: req.params.courseID }, (err, result) => {
        allowCORS(res)
        if (err) {
            console.log("There was an error processing request from endpoint /course/:courseID");
            console.log(err)
            res.status(500).json(dbError)
        } else if (!result) {
            console.log("No course exists matching the ID given.");
            res.status(404).json(notFoundError)
        } else {
            res.json([result]);
        }
    }).clone().catch(err => {
        console.log(err)
        res.status(500).json(serverError)
    });
});

app.get("/student/:GTID", async (req, res) => {
    const student = await Student.findOne({ _id: req.params.GTID });
    allowCORS(res)
    res.json(student);
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
        // console.log(response);
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
        // console.log(response);
        res.send({ message: response });
    });
});

app.get("/studentcourses/:GTID", async (req, res) => {
    allowCORS(res)
    Student.findOne({ _id: req.params.GTID }, async (err, student) => {
        if (!student) {
            res.status(404).json(notFoundError)
        } else if (err) {
            console.log(err)
            res.status(500).json(dbError)
        } else {
            const courses = [],
                semesters = [],
                grades = []
            let totalHours = 0
            for (let course of student.coursesTaken) {
                let courseData = await Course.findOne({ _id: course._id }).clone()
                courses.push(courseData)
                semesters.push(course.semester)
                grades.push(course.grade)
                totalHours += courseData.creditHours
            }
            res.json({
                courses: courses,
                semesters: semesters,
                grades: grades,
                credits: totalHours
            });
        }
    }).clone().catch(err => {
        console.log(err)
        res.status(500).json(serverError)
    })
});

// app.post("/studentcourses", async (req, res) => { //needs to be modified, querying student.js for all courses
//     const student = await Student.findOne({ GTID: req.params.GTID });
//     return res.json(student);
// });

app.post("/attemptlogin", jsonParser, (req, res) => {
    Student.findOne({ _id: req.body.GTID }, (err, response) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "error" });
        } else if (!response) {
            res.status(404).json({ message: "no user found" });
        } else {
            res.json({ message: "success", user: response });
        }
    });
});

//route that returns all the user's courses

// app.post("/createcoursesection", async (req, res) => {
//     await Student.findOne({ courseSectionID: req.body.courseSectionID }, (err, result) => {
//         let response;
//         if (err) {
//             response = "There was an error finding a course section. Please check server.js";
//         } else if (result) {
//             response = "This course section already exists. Try using an update post API instead.";
//         } else {
//             const newCourseSection = new Student({
//                 courseSectonID: req.body.courseSectionID,
//                 courseID: req.body.courseID,
//                 section: req.body.section,
//                 professorName: req.body.professorName
//             });
//             newCourseSection.save();
//             response = "New course section added successfully!";
//         }
//         console.log(response);
//         res.send({ message: response });
//     });
// });

// probably don't need?


//TODO (once we have a schema?)
//courses in progress
//courses taken
//requirements based on majors
//^ comes from GT CS degree info
//setup POST, GET, PUT

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    if (err) { return console.log(err); }
    console.log("Express Server listening on port " + port);
});
