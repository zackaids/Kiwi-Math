import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending data:", { email, pass });  // Debug statement
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, pass }),
        });

        const data = await response.json();
        console.log("Received response:", data);  // Debug statement
        if (response.status === 200) {
            // Redirect to the home page
            navigate("/home");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                <button className="login-button">Log In</button>
            </form>
            <span className="register-link" href="#" onClick={() => props.onFormSwitch("register")}>Don't have an account? Register here.</span>
        </div>
    );
}





// import React, { useState } from "react";

// export function Login(props) {
//     const [email, setEmail] = useState("");
//     const [pass, setPass] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     }

//     return (
//         <div class="auth-form-container">
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label htmlFor="email">E-mail</label>
//                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" name="email"/>
//                 <label htmlFor="password">Password</label>
//                 <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
//                 <button class="login-button">Log In</button>
//             </form>
//             <span className="register-link" href="#" onClick={() => props.onFormSwitch("register")}>Don't have an account? Register here.</span>
//         </div>
//     )
// }