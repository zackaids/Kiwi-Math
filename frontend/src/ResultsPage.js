import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function ResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const results = location.state?.results;

    if (!results) {
        return <div>Loading...</div>;
    }

    const totalQuestions = results.length;
    const correctAnswers = results.filter(result => result.isCorrect).length;
    const incorrectAnswers = totalQuestions - correctAnswers;

    const categoryScores = results.reduce((acc, result) => {
        if (!acc[result.category]) {
            acc[result.category] = { correct: 0, total: 0 };
        }
        acc[result.category].total += 1;
        if (result.isCorrect) {
            acc[result.category].correct += 1;
        }
        return acc;
    }, {});

    const categoryData = Object.keys(categoryScores).map(category => ({
        category,
        correct: categoryScores[category].correct,
        total: categoryScores[category].total,
        percentage: (categoryScores[category].correct / categoryScores[category].total) * 100
    }));

    // Sort categories from weakest to strongest
    categoryData.sort((a, b) => a.percentage - b.percentage);

    const getProficiencyLevel = (correct) => {
        if (correct >= 5) return { level: "Exceeds Proficiency", color: "darkgreen" };
        if (correct === 4) return { level: "Proficient", color: "lightgreen" };
        if (correct === 3) return { level: "Basic", color: "orange" };
        return { level: "Below Basic", color: "red" };
    };

    const handleLearnMoreClick = () => {
        navigate('/learn');
    };

    return (
        <div className="results-page">
            <h2>Overall Results</h2>
            <p>Total Questions: {totalQuestions}</p>
            <p>Correct Answers: {correctAnswers}</p>
            <p>Incorrect Answers: {incorrectAnswers}</p>

            <h2>Category Performance</h2>
            <ul>
                {categoryData.map((category, index) => {
                    const proficiency = getProficiencyLevel(category.correct);
                    return (
                        <li key={index} style={{ color: proficiency.color }}>
                            <strong>{category.category}</strong>: {category.correct}/{category.total} correct ({category.percentage.toFixed(2)}%) - {proficiency.level}
                        </li>
                    );
                })}
            </ul>

            <div 
                className="learn-more-button" 
                onClick={handleLearnMoreClick} 
                style={{ 
                    marginTop: '20px', 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    cursor: 'pointer', 
                    textAlign: 'center', 
                    borderRadius: '5px' 
                }}
            >
                Learn More
            </div>
        </div>
    );
}
