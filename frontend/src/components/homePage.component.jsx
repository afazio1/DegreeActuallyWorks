import './homePage.styles.scss'
import axios from 'axios'
import TableOfContents from './toc.component'
import CourseTable from './table.component'
import React, { useRef, useState, useEffect } from 'react'

const HomePage = (props) => {
    const { user } = props,
        [ inProgressRef, _ ] = useState(useRef()),
        [ studentCourses, setStudentCourses ] = useState([]),
        [ studentCourseSemesters, setStudentCourseSemesters ] = useState([]),
        [ studentCourseGrades, setStudentCourseGrades ] = useState([]),
        [ totalCredits, setTotalCredits ] = useState(0)
    
    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/studentcourses/${user._id}`).then(res => {
                const { courses, semesters, grades, credits } = res.data
                setStudentCourses(courses)
                setStudentCourseSemesters(semesters)
                setStudentCourseGrades(grades)
                setTotalCredits(credits)
            })
        }
    }, [user])
    
    return (
        <div id="container">
            { user && studentCourses &&
                <>
                    <TableOfContents title="Table of Contents">
                        <p toRef={inProgressRef}>In-Progress</p>
                    </TableOfContents>

                    <h1 ref={inProgressRef}>
                        <span className="title">In-Progress</span>
                        <span className="sub-title">Credits Applied: {totalCredits}</span>
                    </h1>

                    <CourseTable columnNames={[
                        'Course #',
                        'Course Name',
                        'Hrs',
                        'Term'
                    ]} keys={[
                        '_id',
                        'name',
                        'creditHours',
                        'semester'
                    ]} rowStatus={Array(studentCourses.length).fill('IP')}
                    semesterData={studentCourseSemesters} 
                    data={studentCourses}/>
                </>
            }
        </div>
    )
}

export default HomePage
