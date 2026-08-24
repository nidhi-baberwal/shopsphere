import { useState } from "react";
import "../styles/login.css";

const Login = () => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = async() => {
        try{
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

             const result = await response.json();

             if(!response.ok){
                throw new Error(result.message || "Login failed");
             }

             localStorage.setItem("token", result.token);

             console.log("Login successful");

        } catch(error){
            console.log(error);
        }

    }

    return (
        <main className="login-page">

            <form
            className="login-form"
            onSubmit={(e) => {
             (e.preventDefault());
             handleSubmit();
             }}
             >
                
        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your Shopsphere account
        </p>

        <input 
        type="email"
        value={email}
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        />

        <input 
        type="password"
        value={password}
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
            Login
        </button>

            </form>
        </main>
    );
}

export default Login;