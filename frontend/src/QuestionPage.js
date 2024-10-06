import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DisclaimerPage } from "./DisclaimerPage";

export function QuestionPage() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [results, setResults] = useState([]); // To store the results of each question
    const [showDisclaimer, setShowDisclaimer] = useState(true); // To show the disclaimer screen initially
    const navigate = useNavigate();

    useEffect(() => {
        const grade = localStorage.getItem("userGrade");

        if (grade) {
            fetch(`http://localhost:5000/questions/${grade}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Flatten the questions from all categories into a single array
                    const allQuestions = Object.values(data).flatMap(categoryArray => {
                        return categoryArray.flatMap(category => category.Questions.map(question => ({
                            ...question,
                            category: category.Category // Add category to each question
                        })));
                    });
                    setQuestions(shuffleArray(allQuestions)); // Shuffle the questions before setting them
                })
                .catch(error => console.error("Error fetching questions:", error));
        } else {
            alert("Grade not found");
        }
    }, []);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleStart = () => {
        setShowDisclaimer(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.Answer;
        const newResults = [...results, { question: currentQuestion.Question, selectedOption, isCorrect, category: currentQuestion.category }];
        setResults(newResults);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption("");
        } else {
            // Send results to backend
            fetch('http://localhost:5000/evaluate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newResults),
            })
            .then(response => response.json())
            .then(data => {
                navigate('/results', { state: { results: newResults } }); // Navigate to results page with results
            })
            .catch(error => console.error("Error sending results:", error));
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="question-page">
            {showDisclaimer ? (
                <DisclaimerPage onStart={handleStart} totalQuestions={questions.length} />
            ) : (
                <>
                    <h1>{currentQuestion.category}</h1> {/* Display the category */}
                    <h2>{currentQuestion.Question}</h2>
                    <progress value={progress} max="100"></progress> {/* Progress bar */}
                    <form onSubmit={handleSubmit}>
                        {currentQuestion.Options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={`option-${index}`}
                                    name="option"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                <label htmlFor={`option-${index}`}>{option}</label>
                            </div>
                        ))}
                        <button type="submit" disabled={!selectedOption}>Submit</button>
                    </form>
                </>
            )}
        </div>
    );
}
