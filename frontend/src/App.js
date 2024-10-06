import useLocalStorage from "use-local-storage";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import { Toggle } from "./components/Toggle";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home"; // Assuming you have a Home component
import { QuestionPage } from "./QuestionPage"; // Import the QuestionPage component

function App() {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <Router>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
        <Toggle
          isChecked={isDark}
          handleChange={() => setIsDark(!isDark)}
        />
        <Routes>
          <Route path="/login" element={<Login onFormSwitch={toggleForm} />} />
          <Route path="/register" element={<Register onFormSwitch={toggleForm} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/questions" element={<QuestionPage />} /> {/* Add the route for QuestionPage */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import useLocalStorage from "use-local-storage";
// import React, { useState } from "react";
// import './App.css';
// import { Toggle } from "./components/Toggle";
// import { Login } from "./Login";
// import { Register } from "./Register"
// // 7700
// function App() {
//   const [isDark, setIsDark] = useLocalStorage("isDark", false);
//   const [currentForm, setCurrentForm] = useState("login");
//   const toggleForm = (formName) => {
//     setCurrentForm(formName);
//   }

//   return (
//     <div className="App" data-theme={isDark ? "dark" : "light"}>

//       <Toggle
//         isChecked={isDark}
//         handleChange={() => setIsDark(!isDark)}
//       />
//       {
//         currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
//       }
//     </div>
//   );
// }

// export default App;