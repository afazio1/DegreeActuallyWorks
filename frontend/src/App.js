import TopBar from './components/topBar.component'
import HomePage from './components/homePage.component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const testUser = {  // Not a real user from db, just for display testing
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

  return (
    <Router>
      <TopBar user={testUser}/>
      <Routes>
        {/* <Route path="/user">
          
        </Route>
        <Route path="/course/:courseId">
          
        </Route>
        <Route path="/junior-design-options">
          
        </Route> */}
        <Route path="/" element={<HomePage/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
