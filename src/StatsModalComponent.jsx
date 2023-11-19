import React, { useState } from 'react'
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  MenuItem,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Link,
  Text,
  Spinner,
  Center
} from '@chakra-ui/react'
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons'
import { useFirebase } from './FirebaseContext'

function StatsModalComponent(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userProblems, setUserProblems] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const { db } = useFirebase()

  const convertTimestampToDate = (timestamp) => {
    return timestamp ? new Date(timestamp.seconds * 1000).toLocaleString("en-US") : '';
  };  

  // this is being used in two places should dry
  const getProblemTitle = (url) => {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 2];
    const words = lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  };

  const fetchUserProblems = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "userProblemTracking"), 
        where("uid", "==", props.currentUserUid),
        orderBy("clickedAt", "desc"))
      const querySnaptshot = await getDocs(q)
      const problems = querySnaptshot.docs.map(doc => doc.data())
      setUserProblems(problems)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpen = () => {
    fetchUserProblems()
    onOpen()
  }

  return (
    <>
      <MenuItem onClick={handleOpen}>Your Stats</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Stats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Center>
                <Spinner color="blue.500" size={'xl'}/>
              </Center>
              ) : (
                userProblems.length === 0 ?
                  <Text textAlign={'center'}>There is nothing here yet! Start a question to automatically add to your stats.</Text>
                :
                  <List spacing={3}>
                    {userProblems.map((problem, index) => (
                      <React.Fragment key={index}>
                        {problem.completed_at ? (
                          <ListItem>
                            <div>
                              <ListIcon as={CheckCircleIcon} color='green.500' />
                              {convertTimestampToDate(problem.completed_at)}
                            </div>
                            <Link href={problem.link} isExternal mt={2} color="teal.500">
                              {getProblemTitle(problem.link)} <Text as="span">→</Text>
                            </Link>
                          </ListItem>
                        ) : (
                          <ListItem>
                            <div>
                              <ListIcon as={EditIcon} color='yellow.500' />
                              {convertTimestampToDate(problem.clickedAt)}
                            </div>
                            <Link href={problem.link} isExternal mt={2} color="teal.500">
                              {getProblemTitle(problem.link)} <Text as="span">→</Text>
                            </Link>
                          </ListItem>
                        )}
                      </React.Fragment>
                    ))}
                  </List>
              )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default StatsModalComponent