import React, { useState, useEffect } from "react";

export function QuestionPage() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/questions')
            .then(response => response.json())
            .then(data => setQuestions(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption("");
        } else {
            alert("You have completed all the questions!");
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="question-page">
            <h2>{currentQuestion.question}</h2>
            <form onSubmit={handleSubmit}>
                {currentQuestion.options.map((option, index) => (
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
