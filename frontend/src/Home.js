import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

export function Home() {
  const navigate = useNavigate();

  const handleRetakeTest = () => {
    navigate('/questions');
  };

  const handleLearn = () => {
    navigate('/learn');
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <div className="home-button learn-button" onClick={handleLearn}>LEARN</div>
        <div className="home-button test-button" onClick={handleRetakeTest}>ASSESSMENT TEST</div>
        <div className="home-button profile-button">PROFILE</div>
        <div className="home-button options-button">OPTIONS</div>
      </div>
    </div>
  );
}
