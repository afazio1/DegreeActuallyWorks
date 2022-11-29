const mongoose = require("mongoose");
const {connectDB, closeDB} = require("../config/db");
const Course = require("../models/course");
const Student = require("../models/student");
const Requirement = require('../models/requirement')
const RequirementGroup = require('../models/requirementGroup')
const axios = require("axios");
let courses_dict = require("./courses_dictionary");
let requirements_dict = require('./requirements_test_dictionary')
// This dict is not comprehensive!

connectDB();

const seedDB = async () => {
    await Course.deleteMany({});
    await Student.deleteMany({});
    await Requirement.deleteMany({});

    await addCourseData();
    await addStudentData();
    await addRequirementsData();
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

    const dummyCourse = new Course({
        _id: '__TEST 1000',
        name: 'Dummy Course',
        description: 
`This course is used for database-related debugging processes. 
If you are seeing this as a student, there's probably something wrong.`,
        creditHours: 0,
        department: '__TEST',
        url: 'https://example.com'
    });
    await dummyCourse.save();
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
            major: ["Computer Science"],
            earnedCredits: 10,
            gpa: 3.5,
            level: 'Undergraduate Semester',
            classification: 'Freshman',
            college: 'College of Computing',
            degree: 'BS in Computer Science',
            degreeCandidate: null,
            academicStanding: null,
            graduationInformation: null,
            minor: 'Computational Media',
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
    
    const dummyStudent = new Student({
        _id: 900000000,
        firstName: '_George P.',
        lastName: '_Burdell',
        email: 'george.burdell@me.gatech.edu',
        major: ["_Major1", '_Major2'],
        earnedCredits: 1000,
        gpa: 0.0,
        level: '_AlreadyFaculty!',
        classification: '_PostGraduate!',
        college: '_Engineering',
        degree: '_BS in Degree',
        degreeCandidate: '_Helluva Engineer',
        academicStanding: '_Extraordinary',
        graduationInformation: '_Graduated',
        minor: ['_Minor1', '_Minor2'],
        coursesTaken: [
            {
                _id: '__TEST 1000',
                ref: 'Course',
                semester: '_Semester',
                grade: '_S'
            }
        ]
    });

    await dummyStudent.save()
}

const addRequirementsData = async () => {
    const { requirements: reqs, requirementGroups: reqGroups } = requirements_dict
    for (let r of reqs) {
        let newReq = new Requirement(r)
        await newReq.save()
    }
    for (let rGroup of reqGroups) {
        let newReqGroup = new RequirementGroup(rGroup)
        await newReqGroup.save()
    }
}

async function seedAndClose() {
    await seedDB();
    closeDB();
}
seedAndClose()