import { useState } from "react";
import "../styles/Register.css";

const Register = () => {

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleRegister = async() => {
     const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });
     const result = await response.json();

     console.log(result);
}

    return (
        <main className="register-page">
            <form className="register-form">
        <h1>Register</h1>

        <input 
         onChange={(e) => setName(e.target.value)}
         type="text"
         placeholder="Your Name"
        />

        <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter Your Email"
        />

        <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter Your Password"
        />

        <button onClick={handleRegister}>
            Register
        </button>

        </form>
         </main>
    );
}

export default Register;