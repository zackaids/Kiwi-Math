import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LearnPage.css';

import algebra from './algebra.png';
import geometry from './geometry.png';
import calculus from './calculus.png';
import statistics from './statistics.png';


export function LearnPage() {
    const navigate = useNavigate();

    const categories = [
        { name: 'Algebra', image: algebra },
        { name: 'Geometry', image: geometry },
        { name: 'Calculus', image: calculus },
        { name: 'Statistics', image: statistics }
    ];

    const handleCategoryClick = (category) => {
        // Handle category click (interaction portion to be added later)
        console.log(`Clicked on ${category}`);
    };

    return (
        <div className="learn-page">
            <h2>Learn</h2>
            <div className="categories">
                {categories.map((category, index) => (
                    <div key={index} className="category" onClick={() => handleCategoryClick(category.name)}>
                        <img src={category.image} alt={category.name} className="category-image" />
                        <div className="category-name">{category.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
