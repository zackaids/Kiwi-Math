// import React, { useState, useEffect } from "react";

// export function QuestionPage() {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedOption, setSelectedOption] = useState("");

//     useEffect(() => {
//         const grade = localStorage.getItem("userGrade");
//         console.log("Grade from localStorage:", grade);

//         if (grade) {
//             fetch(`http://localhost:5000/questions/${grade}`)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error! status: ${response.status}`);
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log("Fetched data:", data); // Debug statement
//                     // Flatten the questions from all categories into a single array
//                     const allQuestions = Object.values(data).flatMap(categoryArray => {
//                         return categoryArray.flatMap(category => category.Questions);
//                     });
//                     console.log("All questions:", allQuestions); // Debug statement
//                     setQuestions(allQuestions);
//                 })
//                 .catch(error => console.error("Error fetching questions:", error));
//         } else {
//             alert("Grade not found");
//         }
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setSelectedOption("");
//         } else {
//             alert("You have completed all the questions!");
//         }
//     };

//     if (questions.length === 0) {
//         return <div>Loading...</div>;
//     }

//     const currentQuestion = questions[currentQuestionIndex];
//     console.log("Current question:", currentQuestion); // Debug statement

//     return (
//         <div className="question-page">
//             <h2>{currentQuestion.Question}</h2>
//             <form onSubmit={handleSubmit}>
//                 {currentQuestion.Options.map((option, index) => (
//                     <div key={index}>
//                         <input
//                             type="radio"
//                             id={`option-${index}`}
//                             name="option"
//                             value={option}
//                             checked={selectedOption === option}
//                             onChange={(e) => setSelectedOption(e.target.value)}
//                         />
//                         <label htmlFor={`option-${index}`}>{option}</label>
//                     </div>
//                 ))}
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";

export function QuestionPage() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [results, setResults] = useState([]); // To store the results of each question

    useEffect(() => {
        const grade = localStorage.getItem("userGrade");
        console.log("Grade from localStorage:", grade);

        if (grade) {
            fetch(`http://localhost:5000/questions/${grade}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Fetched data:", data); // Debug statement
                    // Flatten the questions from all categories into a single array
                    const allQuestions = Object.values(data).flatMap(categoryArray => {
                        return categoryArray.flatMap(category => category.Questions.map(question => ({
                            ...question,
                            category: category.Category // Add category to each question
                        })));
                    });
                    console.log("All questions:", allQuestions); // Debug statement
                    setQuestions(allQuestions);
                })
                .catch(error => console.error("Error fetching questions:", error));
        } else {
            alert("Grade not found");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.Answer;
        setResults([...results, { question: currentQuestion.Question, selectedOption, isCorrect, category: currentQuestion.category }]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption("");
        } else {
            alert("You have completed all the questions!");
            console.log("Results:", results); // Debug statement
            // Send results to backend
            fetch('http://localhost:5000/evaluate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(results),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Evaluation results:", data); // Debug statement
            })
            .catch(error => console.error("Error sending results:", error));
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    console.log("Current question:", currentQuestion); // Debug statement

    return (
        <div className="question-page">
            <h1>{currentQuestion.category}</h1> {/* Display the category */}
            <h2>{currentQuestion.Question}</h2>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
