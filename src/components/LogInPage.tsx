import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                credentials: "include", // 🧠 viktigt för att spara session-cookie
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Felaktiga inloggningsuppgifter!");
            }

            console.log("Inloggning lyckades!");
        } catch (err) {
            alert('error');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4EDE8]">
            {/* Navbar */}
            <nav className="w-full bg-[#3B4E6B] text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Kursly</h1>
                <div className="flex space-x-4">
                    <a href="#" className="hover:underline">Kurser</a>
                    <a href="#" className="hover:underline">Om oss</a>
                    <input
                        type="text"
                        placeholder="söker"
                        className="p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#D6B8A8]"
                    />
                    <button className="bg-white text-[#3B4E6B] px-3 py-1 rounded hover:bg-gray-200 transition">
                        Sök
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex items-center justify-center w-full max-w-4xl p-6 space-x-8">
                {/* Image */}

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

                    <div className="mt-4 text-[#3B4E6B]">
                        <hr className="border-t-2 border-gray-400 w-full mb-2" />
                        <p>Inget konto?</p>
                        <button className="mt-2 bg-[#3B4E6B] text-white px-4 py-2 rounded-lg hover:bg-[#2A3A55] transition">
                            Registrera
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-[#D6B8A8] p-6 mt-8 text-center text-sm">
                <div className="flex justify-between max-w-4xl mx-auto">
                    <div>
                        <h3 className="font-bold">Kontakt</h3>
                        <p>info@kursly.se</p>
                        <p>070 123 456 78</p>
                    </div>
                    <div>
                        <h3 className="font-bold">Kurser</h3>

                        <a href="/it-kurser" className="text-blue-600 hover:underline">IT</a>
                        <p>Samhälle</p>
                        <p>Musik</p>
                        <p>Språk</p>
                    </div>
                </div>
                <p className="mt-4">&copy; 2025 Kursly All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default LoginPage;
