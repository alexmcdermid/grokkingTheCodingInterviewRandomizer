import './App.css';
import { Box, Heading, Container, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import QuestionRandomizer from './QuestionRandomizer';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container>
      <Flex gap={4} p={4}>
        <Heading as="h1" size="md" whiteSpace="nowrap">
          Grokking The Coding Interview Randomizer
        </Heading>
        <IconButton
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          isRound
          size="md"
          onClick={toggleColorMode}
          aria-label={`Switch to ${
            colorMode === 'dark' ? 'light' : 'dark'
          } mode`}
        />
      </Flex>

      <Box padding="6" boxShadow="lg">
        <QuestionRandomizer />
      </Box>
    </Container>
  );
}

export default App;
