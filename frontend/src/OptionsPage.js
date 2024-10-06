import React from 'react';
import './OptionsPage.css';

export function OptionsPage() {
    return (
        <div className="options-page">
            <h2>Options</h2>
            <div className="options-list">
                <div className="option-item">
                    <label htmlFor="notifications">Enable Notifications</label>
                    <input type="checkbox" id="notifications" />
                </div>
                <div className="option-item">
                    <label htmlFor="dark-mode">Dark Mode</label>
                    <input type="checkbox" id="dark-mode" />
                </div>
                <div className="option-item">
                    <label htmlFor="language">Language</label>
                    <select id="language">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
