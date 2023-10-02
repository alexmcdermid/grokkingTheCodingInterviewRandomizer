import React, { useState } from 'react';
import { Button, Text, Link, Heading, Box } from '@chakra-ui/react';
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
    <Box>
      <Button colorScheme="teal" onClick={getRandomQuestion}>Get Random Question</Button>
      {randomQuestion && (
        <Box mt={4}>
          <Heading as="h2" size="md">Category: {randomCategory}</Heading>
          <Link href={randomQuestion} isExternal mt={2} color="teal.500">
            {randomQuestion} <Text as="span" ml={1}>→</Text>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default QuestionRandomizer;
