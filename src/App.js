import './App.css';
import { Box, Heading, Container } from '@chakra-ui/react';
import QuestionRandomizer from './QuestionRandomizer';


function App() {
  return (
    <Container centerContent>
      <Box padding="6" boxShadow="lg">
        <Heading as="h1" size="xl" marginBottom="4">
          Grokking The Coding Interview Randomizer
        </Heading>
        <QuestionRandomizer />
      </Box>
    </Container>
  );
}


export default App;
