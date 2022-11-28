import './homePage.styles.scss'
import axios from 'axios'
import TableOfContents from './toc.component'
import React, { useRef, useState, useEffect } from 'react'

const HomePage = (props) => {
    const { user } = props,
        [ testRef, setTestRef ] = useState(useRef(null)),
        [ testCourse, setTestCourse ] = useState([{}])
    
    useEffect(() => {
        axios.get('http://localhost:8000/').then(res => {
            setTestCourse(res.data)
            console.log(testCourse)
        })
    })
    
    return (
        <>
            <TableOfContents title="Table of Contents">
                <p toRef={testRef}>Click me</p>
            </TableOfContents>

            <h1 ref={testRef}>
                <span class="title">TestH1</span>
                <span class="sub-title">Credits Applied: 4</span>
            </h1>
            
        </>
    )
}

export default HomePage
