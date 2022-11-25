import './App.styles.scss'
import TopBar from './components/topBar.component'
import HomePage from './components/homePage.component';
import UserPage from './components/userPage.component'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.user = {  // Not a real user from db, just for display testing
            "id": 912345678,
            "firstName": "George P.",
            "lastName": "Burdell",
            "email": "gburdell@gatech.edu",
            "major": ["Computer Science"],
            "minor": [],
            "classification": "Senior",
            "earnedCredits": 126,
            "gpa": 4.0,
            "coursesTaken": [
                {
                    "id": "GT 1000",
                    "semester": "Fall 2022",
                    "grade": "A"
                }
            ]
        }
    }

    render() {
        return (
            <Router>
                <TopBar user={this.user} />
                <div id="container">
                    <Routes>
                        <Route exact path="/" element={<HomePage/>} />
                        <Route path="/user" /> 
                        <Route path="/course/:courseId" />
                        <Route path="/junior-design-options" />
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
