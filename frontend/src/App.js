import './App.styles.scss'
import TopBar from './components/topBar.component'
import HomePage from './components/homePage.component';
import UserPage from './components/userPage.component'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios';

export default function App() {
    const [user, setUser] = useState();

    const getUser = () => {
        axios.get("http://localhost:8000/student/900000000")
            .then(response => {
                console.log(response)
                setUser(response.data)
            });

    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Router>
                <TopBar user={user} />
                <Routes>
                    <Route path="/" element={<HomePage user={user}/>} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/course/:courseId" />
                    <Route path="/junior-design-options" />
                </Routes>
            </Router>
        </>
    );
}

// Not a real user from db, just for display testing
// { 
//     "id": 912345678,
//     "firstName": "George P.",
//     "lastName": "Burdell",
//     "email": "gburdell@gatech.edu",
//     "major": ["Computer Science"],
//     "minor": [],
//     "classification": "Senior",
//     "earnedCredits": 126,
//     "gpa": 4.0,
//     "coursesTaken": [
//         {
//             "id": "GT 1000",
//             "semester": "Fall 2022",
//             "grade": "A"
//         }
//     ]
// }
