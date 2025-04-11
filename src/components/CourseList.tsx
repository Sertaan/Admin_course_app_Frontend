import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

interface Course {
    id: number;
    name: string;
    description: string;
}

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string>("");


        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/courses", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}` // spara token i localStorage eller sessionStorage innan
                    }
                });
                setCourses(response.data);
            } catch (error) {
                setError("Kunde inte hämta kurserna.");
                console.error(error);
            }
        };

    useEffect(() => {

        fetchCourses();
    }, []); // tom array betyyder att useEffect körs en gång näär komponenten laddas

    return (
        <div style={{textAlign: "center", marginTop: "2rem"}}>
            <h2>Registrerade kurser</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <div>
                {courses.length === 0 ? (
                    <p>Inga kurser registrerade.</p>
                ) : (
                    <ul>
                        {courses.map((course) => (
                            <li key={course.id} style={{marginBottom: "10px"}}>
                                <h3>{course.name}</h3>
                                <p>{course.description}</p>
                                <p>A link with reference from:
                                    <a href="https://www.w3schools.com/css/css_examples.asp">W3Schools.com</a>
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <li>
                <Link
                    to={"/dashboard"}
                >
                    Tillbaka till Dashboard
                </Link>
            </li>
            <li>
                <Link
                    to={"/register-course"}
                >
                    Registrera kurser
                </Link>
            </li>


        </div>

    );
};

export default CourseList;
