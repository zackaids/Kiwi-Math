import React from "react";

export function DisclaimerPage({ onStart, totalQuestions }) {
    return (
        <div className="disclaimer-page">
            <h1>Assessment Test</h1>
            <p>This is an assessment test consisting of {totalQuestions} questions. It will be used to evaluate your knowledge in math level. You can begin when you press the button below.</p>
            <button onClick={onStart}>Start</button>
        </div>
    );
}
