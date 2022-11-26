const mongoose = require("mongoose");
const fs = require('fs')
const connectDB = require('../config/db')
const Student = require("../models/student");
const Course = require("../models/course");

connectDB();

// Quick util implementation for rsplit, taken off SO apparently
String.prototype.rsplit = function(sep, maxsplit) {
    var split = this.split(sep);
    return maxsplit ? [ split.slice(0, -maxsplit).join(sep) ].concat(split.slice(-maxsplit)) : split;
}

import('pdf2json').then(async pdf2json => {  // Workaround since we can't use import from statement or require()
    const PDFParser = pdf2json.default
    const pdfParser = new PDFParser(this,1);

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", async pdfData => {
        let textSegment,
        // All student info indices
            studentNameIndex, levelIndex, idIndex, degreeIndex, classifIndex, collegeIndex, gpaIndex, 
            majorIndex, degreeCandidateIndex, concentrationIndex, academicStandingIndex, minorIndex, gradInfoIndex,
        // Start and end of sections
            inProgressStart, inProgressEnd;  // We start simple by only parsing in progress...
        // Load PDF into array of strings, meanwhile memorize indices of sections for later parsing
        const rawText = []
        let parseLoc = 0
        for (let page of pdfData.Pages) {
            for (let line of page.Texts) {
                textSegment = decodeURIComponent(line.R[0].T)
                switch (textSegment) {
                    // Forgive me for writing code like this. If I had enough time
                    // I'd rewrite this into something like JSON mapping
                    case 'Student':
                        studentNameIndex = parseLoc+1
                        break
                    case 'Level':
                        levelIndex = parseLoc+1
                        break
                    case 'ID':
                        idIndex = parseLoc+1
                        break
                    case 'Classification':
                        classifIndex = parseLoc+1
                        break
                    case 'College':
                        collegeIndex = parseLoc+1
                        break
                    case 'Overall GPA':
                        gpaIndex = parseLoc+1
                        break
                    case 'Major':
                        majorIndex = parseLoc+1
                        break
                    case 'Concentration':
                        concentrationIndex = parseLoc+1
                        break
                    case 'Minor':
                        minorIndex = parseLoc+1
                        break
                    case 'Degree':
                        // There are two separate lines of text that are both equal to "Degree": 
                        // "Degree" and "Degree\nCandidate". However, since "Degree" is always displayed before 
                        // "Degree\nCandidate," it'll be detected earlier.
                        if (degreeIndex) {
                            degreeCandidateIndex = parseLoc+2
                        } else {
                            degreeIndex = parseLoc+1
                        }
                        break
                    case 'Academic':
                        academicStandingIndex = parseLoc+2
                        break
                    case 'Graduation':
                        gradInfoIndex = parseLoc+2
                        break
                    case 'In-progress':
                        inProgressStart = parseLoc+2
                        break
                    default:
                        if (textSegment.includes('Degree Requirements')){
                            inProgressEnd = parseLoc+1
                            break
                        }
                }
                rawText.push(textSegment)
                parseLoc++
            }
        }

        console.log(JSON.stringify(rawText, undefined, '  '))

        // Get basic student info
        const studentID = rawText[idIndex],
            studentFullName = rawText[studentNameIndex],
            studentSplitName = studentFullName.includes(',') ? studentFullName.split(', ').reverse() : studentFullName.rsplit(' ', 1),
            parsedStudent = new Student(Object.assign({}, {  // Using Object.assign here to skip null values
                _id: studentID,
                firstName: studentSplitName[0],
                lastName: studentSplitName[1],
                // We don't know their email?
                major: rawText[majorIndex],
                gpa: rawText[gpaIndex],
                coursesTaken: [],
                level: rawText[levelIndex],
                classification: rawText[classifIndex],
                college: rawText[collegeIndex],
                degree: rawText[degreeIndex],
                degreeCandidate: rawText[degreeCandidateIndex] != 'Concentration' ? rawText[degreeCandidateIndex] : null,
                academicStanding: rawText[academicStandingIndex] != 'Minor' ? rawText[academicStandingIndex] : null,
                minor: rawText[minorIndex] != 'Graduation' ? rawText[minorIndex] : null,
                graduationInformation: rawText[gradInfoIndex] != 'Disclaimer' ? rawText[gradInfoIndex] : null
            }));
        // Get in-progress courses and info
        let course;
        const creditsApplied = rawText[inProgressStart+1].rsplit(' ', 1)[1]  // Original string looks like: "Credits Applied: 33"
        const inProgressCourses = []
        for (let i = inProgressStart+2; i <= inProgressEnd; i += 5) {
            // If I'm correct about this, we should jump from one course number to the next
            // Run this file once and check content.txt for reference
            course = new Course({
                _id: rawText[i],
                ref: 'Course',
                semester: rawText[i+4],
                grade: null  // FIXME: We don't know this
            })
            inProgressCourses.push(course)
        }
        parsedStudent.coursesTaken.push(...inProgressCourses)

        await Student.updateOne({_id: studentID}, parsedStudent, {upsert: true})
        
        fs.writeFile("./content.txt", JSON.stringify(rawText, undefined, '  '), ()=>{console.log("Done.");});
    });

    pdfParser.loadPDF("./dashboard.pdf");
})
