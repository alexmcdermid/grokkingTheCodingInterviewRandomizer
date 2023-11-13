import './App.css';
import { Box, Heading, Container, Flex } from '@chakra-ui/react';
import { FirebaseProvider } from './FirebaseContext';
import { AuthProvider  } from './AuthContext';
import QuestionRandomizer from './QuestionRandomizer';
import Navbar from './Navbar'

function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <Box>
          <Navbar/>
          <Container>
            <Box padding="4" marginTop={4} boxShadow="lg">
              <Flex gap={4} p={4}>
                <Heading as="h1" size="md">
                  Grokking The Coding Interview Randomizer
                </Heading>
              </Flex>
              <QuestionRandomizer />
            </Box>
          </Container>
        </Box>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
