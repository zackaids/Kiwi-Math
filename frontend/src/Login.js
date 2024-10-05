import React, { useState } from "react";

export function Login(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div class="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                <button class="login-button">Log In</button>
            </form>
            <span className="register-link" href="#" onClick={() => props.onFormSwitch("register")}>Don't have an account? Register here.</span>
        </div>
    )
}