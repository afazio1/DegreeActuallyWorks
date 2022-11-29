import './homePage.styles.scss'
import axios from 'axios'
import TableOfContents from './toc.component'
import CourseTable from './table.component'
import React, { useRef, useState, useEffect } from 'react'

const HomePage = (props) => {
    const { user } = props,
        [ testRef, setTestRef ] = useState(useRef(null)),
        [ testCourse, setTestCourse ] = useState({})
    
    useEffect(() => {
        axios.get('http://localhost:8000/course/__TEST%201000').then(res => {
            setTestCourse(res.data[0])
        })
    }, [])
    
    return (
        <>
            <TableOfContents title="Table of Contents">
                <p toRef={testRef}>Click me</p>
            </TableOfContents>

            <h1 ref={testRef}>
                <span className="title">TestH1</span>
                <span className="sub-title">Credits Applied: 4</span>
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
            ]} rowStatus={[
                'IP'
            ]}
            semesterData={[
                'Fall 2022'
            ]} 
            data={[testCourse]}/>
        </>
    )
}

export default HomePage
