import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Auth.css"

export function Auth() {
    const [currentForm, setCurrentForm] = useState("login");
    const navigate = useNavigate();

    const handleFormSwitch = (formName) => {
        setCurrentForm(formName);
    };

    const handleLogin = async (email, pass) => {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, pass }),
        });

        const data = await response.json();
        if (response.status === 200) {
            localStorage.setItem("userGrade", data.grade);
            navigate("/home");
        } else {
            alert(data.message);
        }
    };

    const handleRegister = async (userData) => {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (response.status === 200) {
            Cookies.set("user", JSON.stringify(data), { expires: 7 });
            navigate("/menu");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="auth-form-container">
            {currentForm === "login" ? (
                <Login onFormSwitch={handleFormSwitch} onLogin={handleLogin} />
            ) : (
                <Register onFormSwitch={handleFormSwitch} onRegister={handleRegister} />
            )}
        </div>
    );
}

function Login({ onFormSwitch, onLogin }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, pass);
    };

    return (
        <div className="login-box">
            <div className="form-background">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" name="email"/>
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                    <button className="login-button">Log In</button>
                </form>
                <span className="register-link" onClick={() => onFormSwitch("register")}>Don't have an account? Register here.</span>
            </div>
        </div>
    );
}

function Register({ onFormSwitch, onRegister }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [grade, setGrade] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            birthday,
            grade,
            email,
            pass
        };
        onRegister(userData);
    };

    return (
        <div className="register-box">
            <div className="form-background">
                <form className="register-form" onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name"/>
                    <label htmlFor="birthday">Date of Birth</label>
                    <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" id="birthday" name="birthday"></input>
                    <label htmlFor="grade">Grade</label>
                    <input value={grade} type="range" min="9" max="12" onChange={(e) => setGrade(e.target.value)} list="markers"></input>
                    <datalist id="markers">
                        <option value="9" label="9th"></option>
                        <option value="10" label="10th"></option>
                        <option value="11" label="11th"></option>
                        <option value="12" label="12th"></option>
                    </datalist>
                    <label htmlFor="email">E-mail</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" name="email"/>
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                    <button className="register-button" type="submit">Register</button>
                </form>
                <span className="login-link" onClick={() => onFormSwitch("login")}>Already have an account? Login here.</span>
            </div>
        </div>
    );
}
