import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to="/home" className="navbar-link">Main Menu</Link>
                <Link to="/learn" className="navbar-link">Learn</Link>
            </div>
            <div className="navbar-right">
                <Link to="/options" className="navbar-link">Options</Link>
                <Link to="/profile" className="navbar-link">
                    <img src="path/to/profile-picture.jpg" alt="Profile" className="profile-picture" />
                </Link>
            </div>
        </div>
    );
}
