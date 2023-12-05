import React, { useState } from 'react';
import { Button, Text, Link, Heading, Box, Flex, Menu, MenuButton, MenuList, MenuItem, Checkbox, List, ListItem, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useLogClick } from './logClick';
import { useUpdateQuestionStatus } from './UpdateQuestionStatus';
import { useAuth } from './AuthContext';
import questions from './Questions';

const QuestionRandomizer = () => {
  const toast = useToast();
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [randomCategory, setRandomCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  // used for logging current completion question and showing completion check
  const [showCompletionButtons, setShowCompletionButtons] = useState(false)
  // this has a tuple of question href and created at 
  const [completionQuestion, setCompletionQuestionInfo] = useState([])
  const updateQuestionStatus = useUpdateQuestionStatus()

  const logClick = useLogClick();
  const { currentUser } = useAuth();

  const handleCompletionClick = async (state) => {
    try {
      await updateQuestionStatus(completionQuestion[0], completionQuestion[1], state)
      setShowCompletionButtons(false);
      toast({
        title: 'Question state updated succesfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating question status:", error);
      toast({
        title: 'Question state failed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleClick = async (question) => {
    const linkHref = question.url;
    if (currentUser) {
      try {
        const clickedAt = await logClick(linkHref, question.difficulty, currentUser.uid, currentUser.email);
        setCompletionQuestionInfo([linkHref, clickedAt]);
        setShowCompletionButtons(true);
      } catch (error) {
        console.error("Error logging click:", error);
      }
    }
  };

  const toggleItem = (item, setSelected) => {
    setSelected(prevItems =>
      prevItems.includes(item)
        ? prevItems.filter(prevItem => prevItem !== item)
        : [...prevItems, item]
    );
  };

  const getRandomQuestion = () => {
    const availableCategories = selectedCategories.length > 0 ? selectedCategories : Object.keys(questions);
    const filteredQuestions = [];
  
    // Filter questions by selected categories and difficulties
    availableCategories.forEach(category => {
      const questionsInCategory = questions[category].filter(question => {
        // Include question if no specific difficulty is selected or if it matches one of the selected difficulties
        return selectedDifficulties.length === 0 || selectedDifficulties.includes(question.difficulty);
      });
      filteredQuestions.push(...questionsInCategory);
    });
  
    // Check if there are any questions available after filtering
    if (filteredQuestions.length === 0) {
      toast({
        title: 'No questions available.',
        description: 'Please adjust your category or difficulty selections.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    // Randomly select a question from the filtered list
    const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
  
    // Find the category of the selected question
    const randomCategory = Object.keys(questions).find(category => questions[category].includes(randomQuestion));
  
    setRandomCategory(randomCategory);
    setRandomQuestion(randomQuestion);
    setShowCompletionButtons(false);
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
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} m={2}>
          Select Categories
        </MenuButton>
        <MenuList>
          {Object.keys(questions).map(category => (
            <MenuItem key={category}>
              <Checkbox isChecked={selectedCategories.includes(category)} onChange={() => toggleItem(category, setSelectedCategories)}>
                {category}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} m={2}>
          Select Difficulty
        </MenuButton>
        <MenuList>
          {["easy", "medium", "hard"].map(difficulty => (
            <MenuItem key={difficulty}>
              <Checkbox isChecked={selectedDifficulties.includes(difficulty)} onChange={() => toggleItem(difficulty, setSelectedDifficulties)}>
                {difficulty}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      
      <Button colorScheme="teal" onClick={getRandomQuestion} m={2}>Get Random Question</Button>
      {randomQuestion && (
        <Box mt={4}>
          <Heading as="h2" size="md">Category: {randomCategory}</Heading>
          <Link href={randomQuestion.url} onClick={() => handleClick(randomQuestion)} isExternal mt={2} color="teal.500">
            {getProblemTitle(randomQuestion.url)} <Text as="span">→</Text>
          </Link>
        </Box>
      )}

    {selectedCategories.length > 0 && (
      <Box mt={4}>
        <Heading as="h3" size="sm">Selected Questions by Category 
        {selectedDifficulties.length > 0 && (` and Difficulty [${selectedDifficulties}]`)}:</Heading>
        <List spacing={3}>
          {selectedCategories.map(category => {
            // Filter questions by difficulty
            const filteredQuestions = questions[category].filter(question => {
              return selectedDifficulties.length === 0 || selectedDifficulties.includes(question.difficulty);
            });
            if (filteredQuestions.length > 0) {
              return (
                <ListItem key={category}>
                  <Heading as="h4" size="xs">{category}</Heading>
                  <List styleType="disc" pl={5}>
                    {filteredQuestions.map((question, index) => (
                      <ListItem key={index}>
                        <Link href={question.url} onClick={() => handleClick(question)} isExternal color="teal.400">
                          {getProblemTitle(question.url)}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              );
            } else {
              return null;
            }
          })}
        </List>
      </Box>
    )}


      {showCompletionButtons && (
        <Flex mt={2} gap={2}>
          <Flex direction={'column'} justifyContent={'center'}>
            <Text>Did you complete {getProblemTitle(completionQuestion[0])}?</Text>
          </Flex>
          <Flex wrap={'nowrap'}>
            <Button colorScheme="green" mr={2} onClick={() => handleCompletionClick(true)}>Yes</Button>
            <Button colorScheme="red" onClick={() => handleCompletionClick(false)}>No</Button>
          </Flex>
        </Flex>
      )}  
    </Box>
  );
};

export default QuestionRandomizer;