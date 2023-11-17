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
  useDisclosure
} from '@chakra-ui/react'
import { useFirebase } from './FirebaseContext'

function StatsModalComponent(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userProblems, setUserProblems] = useState([])
  const { db } = useFirebase()

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
            {userProblems.map((problem, index) => (
              <div key={index}> {problem.link} </div>
            ))}
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