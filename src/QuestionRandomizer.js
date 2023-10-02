import React, { useState } from 'react';
import { Button, Text, Link, Heading, Box, Menu, MenuButton, MenuList, MenuItem, Checkbox } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import questions from './Questions';

const QuestionRandomizer = () => {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [randomCategory, setRandomCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const getRandomQuestion = () => {
    const availableCategories = selectedCategories.length > 0 ? selectedCategories : Object.keys(questions);
    const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    const questionsInCategory = questions[randomCategory];
    const randomQuestion = questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];

    setRandomCategory(randomCategory);
    setRandomQuestion(randomQuestion);
  };

  const getProblemTitle = (url) => {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 2];
    const words = lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  };
  
  return (
    <Box>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Select Categories
        </MenuButton>
        <MenuList>
          {Object.keys(questions).map(category => (
            <MenuItem key={category}>
              <Checkbox isChecked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)}>
                {category}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      
      <Button colorScheme="teal" onClick={getRandomQuestion} ml={4}>Get Random Question</Button>
      {randomQuestion && (
        <Box mt={4}>
          <Heading as="h2" size="md">Category: {randomCategory}</Heading>
          <Link href={randomQuestion} isExternal mt={2} color="teal.500">
            {getProblemTitle(randomQuestion)} <Text as="span">→</Text>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default QuestionRandomizer;