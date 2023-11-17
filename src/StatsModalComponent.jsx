import React, { useEffect, useState } from 'react'
import { query, collection, where, getDocs } from 'firebase/firestore'
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
  Text
} from '@chakra-ui/react'
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons'
import { useFirebase } from './FirebaseContext'

function StatsModalComponent(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userProblems, setUserProblems] = useState([])
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

  useEffect(() => {
    const fetchUserProblems = async () => {
      const q = query(collection(db, "userProblemTracking"), where("uid", "==", props.currentUserUid))
      const querySnaptshot = await getDocs(q)
      const problems = querySnaptshot.docs.map(doc => doc.data())
      setUserProblems(problems)
    }

    fetchUserProblems()
  }, [db, props.currentUserUid])

  return (
    <>
      <MenuItem onClick={onOpen}>Your Stats</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Stats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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