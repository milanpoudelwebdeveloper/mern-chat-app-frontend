import { ViewIcon } from '@chakra-ui/icons'
import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  Image,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { IUser } from '../Context/ChatProvider'

interface props {
  children?: ReactNode
  user: IUser
}

const ProfileModal: React.FC<props> = ({ children, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { name, email, pic } = user
  return (
    <Box>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          icon={<ViewIcon />}
          display={{ base: 'flex' }}
          aria-label="view"
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height={'410px'}>
          <ModalHeader fontSize="30px" display="flex" justifyContent="center">
            {name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image borderRadius="full" boxSize="150px" src={pic} alt={name} />
            <Text fontSize={{ base: '25px', md: '25px' }}>{email}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProfileModal
