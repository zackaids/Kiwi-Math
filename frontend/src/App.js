import useLocalStorage from "use-local-storage";
import React, { useState } from "react";
import './App.css';
import { Toggle } from "./components/Toggle";
import { Login } from "./Login";
import { Register } from "./Register"
// 7700
function App() {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>

      <Toggle
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
      />
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
