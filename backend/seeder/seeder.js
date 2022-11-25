const mongoose = require("mongoose");
const {connectDB, closeDB} = require("../config/db");
const course = require("../models/course");
const Course = require("../models/course");
const Student = require("../models/student");
let courses_dict = require("./courses_dictionary");
const axios = require("axios");


connectDB();

const seedDB = async () => {
    await Course.deleteMany({});
    await Student.deleteMany({});

    await addCourseData();
    await addStudentData();

}
const addCourseData = async () => {
    courses_dict = Object.entries(courses_dict); // [["course id", {}]]

    for (let i = 0; i < courses_dict.length; i++) {
        let course = courses_dict[i][1];

        const addCourse = new Course({
            _id: course["Department"] + " " + course["Course Number"],
            name: course["Course Title"],
            description: course["Description"],
            creditHours: parseInt(course["Hours"]["Credit"]),
            department: course["Department"],
            url: course["url"],
            prerequisites: course["Prerequisites"]
        });
        await addCourse.save();
    }
}

const addStudentData = async () => {
    let res = await axios.get("https://dummyjson.com/users");
    res = res.data;

    for (let users of res.users) {
        const student = new Student({
            _id: Math.floor(Math.random() * 1000000000),
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            major: ["CS"],
            earnedCredits: 10,
            gpa: 3.5,
            coursesTaken: []
        });

        const courses = [
            {
                _id: "MATH 1554",
                ref: 'Course',
                semester: "Fall 2022",
                grade: "A"
            },
            {
                _id: "CS 1301",
                ref: 'Course',
                semester: "Fall 2022",
                grade: "A"
            },
            {
                _id: "CS 1331",
                ref: 'Course',
                semester: "Fall 2022",
                grade: "B"
            }
        ];
        student.coursesTaken.push(...courses);

        await student.save();
    }

}

seedDB();