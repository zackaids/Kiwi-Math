import React from 'react';
import './LearnPage.css';

import algebra from './algebra.png';
import geometry from './geometry.png';
import calculus from './calculus.png';
import statistics from './statistics.png';

export function LearnPage() {
    const categories = [
        { name: 'Algebra', image: algebra, link: 'https://www.khanacademy.org/math/algebra' },
        { name: 'Geometry', image: geometry, link: 'https://www.khanacademy.org/math/geometry' },
        { name: 'Calculus', image: calculus, link: 'https://www.khanacademy.org/math/calculus-1' },
        { name: 'Statistics', image: statistics, link: 'https://www.khanacademy.org/math/statistics-probability' }
    ];

    const handleCategoryClick = (link) => {
        window.location.href = link;
    };

    return (
        <div className="learn-page">
            <h2>Learn</h2>
            <div className="categories">
                {categories.map((category, index) => (
                    <div key={index} className="category" onClick={() => handleCategoryClick(category.link)}>
                        <img src={category.image} alt={category.name} className="category-image" />
                        <div className="category-name">{category.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
