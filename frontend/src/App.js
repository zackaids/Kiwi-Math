import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import { Auth } from "./Auth"; // Import the Auth component
import { Home } from "./Home"; // Import the Home component
import { QuestionPage } from "./QuestionPage"; // Import the QuestionPage component
import { ResultsPage } from "./ResultsPage"; // Import the ResultsPage component
import { LearnPage } from "./LearnPage"; // Import the LearnPage component
import { ProfilePage } from "./ProfilePage"; // Import the ProfilePage component
import { OptionsPage } from "./OptionsPage"; // Import the OptionsPage component
import { Navbar } from "./Navbar"; // Import the Navbar component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} /> {/* Use Auth component for the root path */}
          <Route path="/home" element={<><Navbar /><Home /></>} /> {/* Add Home route */}
          <Route path="/questions" element={<><Navbar /><QuestionPage /></>} /> {/* Add QuestionPage route */}
          <Route path="/results" element={<><Navbar /><ResultsPage /></>} /> {/* Add ResultsPage route */}
          <Route path="/learn" element={<><Navbar /><LearnPage /></>} /> {/* Add LearnPage route */}
          <Route path="/options" element={<><Navbar /><OptionsPage /></>} /> {/* Add OptionsPage route */}
          <Route path="/profile" element={<><Navbar /><ProfilePage /></>} /> {/* Add ProfilePage route */}
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to root path if no match */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
