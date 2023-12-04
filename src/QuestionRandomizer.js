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

  const handleClick = async (event) => {
    const linkHref = event.currentTarget.getAttribute('href');
    if (currentUser) {
      try {
        const clickedAt = await logClick(linkHref, currentUser.uid, currentUser.email);
        setCompletionQuestionInfo([linkHref, clickedAt]);
        setShowCompletionButtons(true);
      } catch (error) {
        console.error("Error logging click:", error);
      }
    }
  };

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
    setShowCompletionButtons(false)
  };

  const getProblemTitle = (question) => {
    const parts = question.url.split('/');
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
              <Checkbox isChecked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)}>
                {category}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      
      <Button colorScheme="teal" onClick={getRandomQuestion} m={2}>Get Random Question</Button>
      {randomQuestion && (
        <Box mt={4}>
          <Heading as="h2" size="md">Category: {randomCategory}</Heading>
          <Link href={randomQuestion} onClick={handleClick} isExternal mt={2} color="teal.500">
            {getProblemTitle(randomQuestion)} <Text as="span">→</Text>
          </Link>
        </Box>
      )}

      {selectedCategories.length > 0 && (
        <Box mt={4}>
          <Heading as="h3" size="sm">Selected Questions by Category:</Heading>
          <List spacing={3}>
            {selectedCategories.map(category => (
              <ListItem key={category}>
                <Heading as="h4" size="xs">{category}</Heading>
                <List styleType="disc" pl={5}>
                  {questions[category].map((question, index) => (
                    <ListItem key={index}>
                      <Link href={question} onClick={handleClick} isExternal color="teal.400">
                        {getProblemTitle(question)}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
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