import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInPage from "./components/LogInPage";
import Dashboard from "./components/Dashboard";
import RegisterCourse from "./components/RegisterCourse";
import CourseList from "./components/CourseList.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LogInPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register-course" element={<RegisterCourse />} />
                <Route path="/courses" element={<CourseList />} />
            </Routes>
        </Router>
    );
}

export default App;
