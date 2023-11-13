import './App.css';
import { Box, Heading, Container, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import QuestionRandomizer from './QuestionRandomizer';
import Navbar from './Navbar'

function App() {
  return (
    <Box>
      <Navbar/>
      <Container>
        <Box padding="6" boxShadow="lg">
          <Flex gap={4} p={4}>
            <Heading as="h1" size="md">
              Grokking The Coding Interview Randomizer
            </Heading>
          </Flex>
          <QuestionRandomizer />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
