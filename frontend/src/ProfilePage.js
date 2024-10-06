import React from 'react';
import './ProfilePage.css';

export function ProfilePage() {
    return (
        <div className="profile-page">
            <h2>Profile</h2>
            <div className="profile-info">
                <img src="path/to/profile-picture.jpg" alt="Profile" className="profile-picture" />
                <div className="profile-details">
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Email:</strong> johndoe@example.com</p>
                    <p><strong>Grade:</strong> 10th</p>
                </div>
            </div>
        </div>
    );
}
