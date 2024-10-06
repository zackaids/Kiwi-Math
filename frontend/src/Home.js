import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
import logo from './kiwilearn.png'; // Make sure to replace with the actual path to your logo image

export function Home() {
  const navigate = useNavigate();

  const handleRetakeTest = () => {
    navigate('/questions');
  };

  const handleLearn = () => {
    navigate('/learn');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleOptions = () => {
    navigate('/options');
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="kiwimath-title">kiwimath</h1>
      </div>
      <div className="home-box">
        <div className="home-button learn-button" onClick={handleLearn}>LEARN</div>
        <div className="home-button test-button" onClick={handleRetakeTest}>ASSESSMENT TEST</div>
        <div className="home-button profile-button" onClick={handleProfile}>PROFILE</div>
        <div className="home-button options-button" onClick={handleOptions}>OPTIONS</div>
      </div>
    </div>
  );
}
