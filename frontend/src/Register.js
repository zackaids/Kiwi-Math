import React, { useState } from "react";

export function Register(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("")
    const [grade, setGrade] = useState("")

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // sent to the backend?
    // }

    return (
        <div class="auth-form-container">
            <form className="login-form" method="post">
                <label>Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name"/>
                <label htmlFor="birthday">Date of Birth</label>
                <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" id="birthday" name="birthday"></input>
                <label htmlFor="grade">Grade</label>
                <input value={grade} type="range" min="9" max="12" onChange={(e) => setGrade(e.target.value)} list ="markers"></input>
                <label htmlFor="email">E-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                <button className="login-button" type="submit">Register</button>

                <datalist id="markers">
                    <option value="9" label="9th"></option>
                    <option value="10" label="10th"></option>
                    <option value="11" label="11th"></option>
                    <option value="12" label="12th"></option>
                </datalist>
            </form>
            <span className="register-link" onClick={() => props.onFormSwitch("login")}>Already have an account? Login here.</span>
        </div>
    );
}