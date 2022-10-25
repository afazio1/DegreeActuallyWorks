import './App.styles.scss'
import TopBar from './components/topBar.component'
import HomePage from './components/homePage.component';
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
                <TopBar user={this.user}/>
                <div id="container">
                    <Routes>
                        <Route path="/user"> {/* Do NOT go to empty paths right now, as they will induce an infinite loop in browser*/}
                            
                        </Route>
                        <Route path="/course/:courseId">
                            
                        </Route>
                        <Route path="/junior-design-options">
                            
                        </Route>
                        <Route path="/" element={<HomePage/>}>
                        </Route>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
