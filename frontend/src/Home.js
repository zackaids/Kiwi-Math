import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

export function Home() {
  const navigate = useNavigate();

  const handleRetakeTest = () => {
    navigate('/questions');
  };

  return (
    <div className="home-container">
      <div className="home-button">LEARN</div>
      <div className="home-button" onClick={handleRetakeTest}>RE-TAKE THE ASSESSMENT TEST</div>
      <div className="home-button">PROFILE</div>
      <div className="home-button">OPTIONS</div>
    </div>
  );
}
