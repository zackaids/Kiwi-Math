import React, { useState } from "react";

export function Register(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div class="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name"/>
                <label>Date of Birth</label>
                <input htmlFor="birthday" type="date" id="birthday" name="birthday"></input>
                <label htmlFor="email">E-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                <button className="login-button">Register</button>
            </form>
            <span className="register-link" onClick={() => props.onFormSwitch("login")}>Already have an account? Login here.</span>
        </div>
    );
}