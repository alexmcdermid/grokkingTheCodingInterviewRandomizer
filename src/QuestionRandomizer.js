import React, { useState } from 'react';
import questions from './Questions';

const QuestionRandomizer = () => {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [randomCategory, setRandomCategory] = useState(null);

  const getRandomQuestion = () => {
    const categories = Object.keys(questions);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const questionsInCategory = questions[randomCategory];
    const randomQuestion = questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];

    setRandomCategory(randomCategory);
    setRandomQuestion(randomQuestion);
  };

  return (
    <div>
      <button onClick={getRandomQuestion}>Get Random Question</button>
      {randomQuestion && (
        <div>
          <h2>Category: {randomCategory}</h2>
          <a href={randomQuestion} target="_blank" rel="noopener noreferrer">{randomQuestion}</a>
        </div>
      )}
    </div>
  );
};

export default QuestionRandomizer;
