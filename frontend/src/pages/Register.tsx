import { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleRegister = async() => {
        try{
            console.log("Register button clicked");

            const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });
     const result = await response.json();

     console.log("Response:", result);

     if(!response.ok){
        throw new Error(result.message || "Registration failed");
     }

     console.log("Registration successful");

     navigate("/login");

} catch(error) {
    console.error("Registration error:", error);
}
};

    return (
        <main className="register-page">
            <form 
            className="register-form"
            onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
            }}
            >
        <h1>Register</h1>

        <input 
         type="text"
         placeholder="Your Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
        />

        <input
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button >
            Create Account
        </button>

        </form>
         </main>
    );
}

export default Register;