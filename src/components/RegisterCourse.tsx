import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type CourseFormValues = {
    name: string;
    description: string;
    deleteId?: string;
};

const RegisterCourse = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CourseFormValues>();

    const [success, setSuccess] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data: CourseFormValues) => {
        setSuccess("");

        const token = localStorage.getItem("token");

        try {
            await axios.post("http://localhost:8080/api/courses", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess("Kurs registrerad!");
            reset(); // Rensar formuläret
        } catch (error) {
            console.error("Fel vid registrering", error);
        }
    };

    const handleDelete = async () => {
        setDeleteMessage("");
        const token = localStorage.getItem("token");

        const deleteId = (document.getElementById("deleteId") as HTMLInputElement).value;

        if (!deleteId) {
            setDeleteMessage("Fyll i ett kurs-ID att radera.");
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/courses/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeleteMessage(`Kurs med ID ${deleteId} har raderats.`);
        } catch (error) {
            console.error("Fel vid borttagning", error);
            setDeleteMessage("Kunde inte radera kursen. Kontrollera ID:t.");
        }
    };

    return (
        <div style={{textAlign: "center", marginTop: "2rem"}}>
            <h2>Registrera en ny kurs</h2>


            <form onSubmit={handleSubmit(onSubmit)}
                  style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "12px"}}>
                <input
                    type="text"
                    placeholder="Kursnamn"
                    {...register("name", {required: "Kursnamn är obligatoriskt"})}
                    style={{width: "50%", padding: "8px"}}
                />
                {errors.name && <p style={{color: "red"}}>{errors.name.message}</p>}

                <textarea
                    placeholder="Beskrivning"
                    {...register("description", {
                        required: "Beskrivning är obligatorisk",
                        minLength: {value: 5, message: "Minst 5 tecken krävs"},
                    })}
                    style={{width: "55%", padding: "8px"}}
                />
                {errors.description && <p style={{color: "red"}}>{errors.description.message}</p>}

                <button
                    type="submit"
                    style={{padding: "10px 15px", marginTop: "10px"}} // skickar data via OnSubmit
                >
                    Registrera kurs
                </button>

            </form>
            {success && <p style={{ color: "green"}}>{success}</p> }

            <h3 style={{ marginTop: "3rem" }}>Radera en kurs</h3>
            <input
            id="deleteId"
            type="text"
            placeholder="Ange kurd-ID att ta bort"
            style={{ width: "50%", padding: "8px", marginTop: "10px"}}
            />
            <button
                onClick={handleDelete}
                style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px 15px",
                    marginTop: "10px",
                }}>
                Radera kurs
            </button>
            {deleteMessage && (
                <p style={{ marginTop: "10px", color: deleteMessage.includes("raderats") ? "green" : "red"}}>
                    {deleteMessage}
                </p>
            )}

            <button
                onClick={() => navigate("/courses")}
            >
                Visa alla kurser
            </button>


            <button
                onClick={() => navigate("/dashboard")}
            >
                Tillbaka till Dashboard
            </button>

            {success && <p style={{color: "green"}}>{success}</p>}
        </div>
    );
};

export default RegisterCourse;
