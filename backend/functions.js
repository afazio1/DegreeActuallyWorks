const express = require("express");
const { connect } = require("mongoose");
const app = express();
const { connectDB, closeDB } = require("./config/db");
const { db } = require("./models/course");
const Course = require("./models/course");
const Student = require("./models/student");
const CourseDict = require("./seeder/courses_dictionary.js");


function findCourse(courseCode, courseNumber)
 {
    Course.find({_id: {$regex: courseCode + " " + courseNumber, $options: "i"}}, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            results.forEach(item => {
                console.log(item._id);
            });
        }
    });
 }

async function addEverything() {
    return new Promise( async (resolve, reject) => {
    let promises = [];
    for (let key in CourseDict) {
        if (CourseDict.hasOwnProperty(key)) {
            promises.push(
                await Course.findOne({_id: key}, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else if (!result) {
                        let course = new Course({
                            _id: key,
                            name: CourseDict[key]['Course Title'],
                            description: CourseDict[key]['Description'],
                            creditHours: CourseDict[key]['Hours']['Credit'],
                            department: CourseDict[key]['Department'],
                            url: CourseDict[key]['url'],
                            prerequisites: CourseDict[key]['Prerequisites']
                        });
                        course.save();
                        console.log(key + " -> " + CourseDict[key]['Course Title'] + " has been added.");
                    } else {
                        // console.log(key + " -> " + CourseDict[key]['Course Title'] + " already exists.");
                        if(CourseDict[key]['Prerequisites'] !== "") {
                        console.log(CourseDict[key]['Prerequisites']);
                        }
                    }
            }).clone());
        }
    }
    Promise.all(promises).then(resolve(true));
});
}
function deleteEverything() {
    return new Promise(async (resolve, reject) => {
    await Course.deleteMany({}).then(resolve(true));
    });
}





function checkIfSatisfiedPrereqs(GTID, courseID) {
    return new Promise(async (resolve, reject) => {
        Course.findOne({_id: courseID}, (err, result) => {
            if(err) {
                console.log(err);
            } else if (!result) {
                resolve("Course not found");
            } else if (result.prerequisites === "") {
                resolve(true);
            } else {
                let prereqs = result.prerequisites;
                resolve(checkIfSatisfiedPrereqsHelper(GTID, courseID, prereqs));
            }
        });
    });
}
async function checkIfSatisfiedPrereqsHelper(GTID, courseID, prereqs) {
    let match = false;
    let matchStart = -1;
    prereqs = prereqs.toUpperCase();
    console.log("Prereqs: " + prereqs);
    while (/[A-Z]+ [0-9]+/.test(prereqs)) {
        for(let i = 0; i < prereqs.length; i++) {
            if (!match && "ABCDEFGHIJKLMNOPQRTUVWXYZ".includes(prereqs.charAt(i))) {
                match = true;
                matchStart = i;
                console.log(prereqs.charAt(i));
            }
            else if (match && "0123456789".includes(prereqs.charAt(i)) && (i == prereqs.length - 1 || prereqs.charAt(i + 1) === " ")) {
                console.log(i);
                match = false;
                let prereqSatisfied = await checkSinglePrereq(GTID, prereqs.substring(matchStart, i + 1));
                prereqs = prereqs.substring(0, matchStart) + prereqSatisfied + (i < prereqs.length - 1 ? prereqs.substring(i + 1) : "");
                console.log(prereqs.charAt(i));
            }
        }
        // console.log(prereqs);
    }
    return eval(prereqs);
}


function checkSinglePrereq(GTID, courseID) {
    return new Promise(async (resolve, reject) => {
        Student.findOne({_id: GTID}, (err, result) => {
            result.coursesTaken.forEach(result => {
                if (err) {
                    console.log(err);
                } else if (result === courseID) {
                    resolve(true);
                }
            });
            resolve(false);
        });
    });
}


//Main Code To Run
// connectDB().then(addEverything).then(closeDB);
connectDB();
checkIfSatisfiedPrereqs("366633164", "CS 1332").then(res => console.log(res));