import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importera useNavigate

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('logout');

    if (query=="true") {
        const handleLogout = async () => {
            const response = await fetch("http://localhost:8080/logout-custom", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                alert("Felaktiga utloggning");
                return;
            }

            console.log("Utloggningen lyckades!");
        };
        handleLogout();

    }

    const handleLogin = async () => {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            alert("Felaktiga inloggningsuppgifter!");
            return;
        }

        console.log("Inloggning lyckades!");
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4EDE8]">
            {/* Navbar */}
            <nav className="w-full bg-[#3B4E6B] text-white p-4 shadow-md">
                <h1 className="text-xl font-bold text-center">Kursly</h1>
        </nav>

    {/* Main Content */}

    <div className="flex items-center justify-center w-full max-w-4xl p-6 space-x-8">
        {/* Login Form */}
                <div className="w-1/2 text-center bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-[#3B4E6B] mb-4">
                        Logga in för att ta del av våra kurser!
                    </h2>
                    <input
                        type="text"
                        placeholder="Användarnamn"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 mb-2 bg-[#D6B8A8] rounded focus:outline-none focus:ring-2 focus:ring-[#3B4E6B]"
                    />
                    <input
                        type="password"
                        placeholder="Lösenord"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-4 bg-[#D6B8A8] rounded focus:outline-none focus:ring-2 focus:ring-[#3B4E6B]"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-[#3B4E6B] text-white p-3 rounded-lg hover:bg-[#2A3A55] transition shadow-md"
                    >
                        Logga in
                    </button>

                </div>
                </div>
                </div>
    );
};

export default LoginPage;
