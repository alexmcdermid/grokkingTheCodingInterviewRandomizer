import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Box, Heading, Container, Flex } from '@chakra-ui/react';
import { AuthProvider  } from './AuthContext';
import QuestionRandomizer from './QuestionRandomizer';
import Navbar from './Navbar'

const firebaseConfig = {
  apiKey: "AIzaSyD2eLPAUwRzO0cMC1giTZpuTzgdSGcTf2U",
  authDomain: "grokkingthecodinginterviewr.firebaseapp.com",
  projectId: "grokkingthecodinginterviewr",
  storageBucket: "grokkingthecodinginterviewr.appspot.com",
  messagingSenderId: "885854526752",
  appId: "1:885854526752:web:b7ce998d3c59bded160b45",
  measurementId: "G-LRLFG100L2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <AuthProvider >
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
    </AuthProvider >
  );
}

export default App;
