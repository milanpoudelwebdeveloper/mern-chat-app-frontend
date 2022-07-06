import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  useToast,
  FormControl,
  Input,
  Box,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { ReactNode, useContext, useState } from 'react'
import { ChatContext, IUser } from '../Context/ChatProvider'
import UserBadgeItem from './UserBadgeItem'
import UserListItem from './UserListItem'

const GroupChatModal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<any>([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  const { user, setChats } = useContext(ChatContext)

  const handleSearch = async (value: string) => {
    setSearch(value)
    if (!value) {
      return
    } else {
      try {
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${user && user.token}`,
          },
        }
        const { data } = await axios.get(
          `http://localhost:8000/api/allusers?keyword=${search}`,
          config
        )
        setSearchResults(data)
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }
  }

  //
  const handleSubmit = async () => {
    if (groupChatName === '' || selectedUsers.length < 2) {
      toast({
        title: 'Please enter a group chat name and select at least 2 users',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
      return
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user && user.token}`,
      },
    }
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/groupChats',
        {
          groupName: groupChatName,
          //we are going to stringify and send the users id by filteting them
          users: JSON.stringify(selectedUsers.map((user: IUser) => user._id)),
        },
        config
      )
      onClose()
      //here data is an single object but in context provider, we need to pass array that's why we do this
      setChats((prevData: any) => [data, ...prevData])
      toast({
        title: 'Group chat created successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Something went wrong while creating group chat',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const handleDelete = (user: IUser) => {
    const selectedUsersList = [...selectedUsers]

    if (selectedUsersList.includes(user)) {
      selectedUsersList.splice(selectedUsersList.indexOf(user), 1)
    }
    setSelectedUsers(selectedUsersList)
  }

  //users to add in a group chat

  const selectUser = (user: IUser) => {
    if (selectedUsers.includes(user)) {
      toast({
        title: 'User already added',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
      return
    }
    const newSelectedUser = [...selectedUsers]
    newSelectedUser.push(user)
    setSelectedUsers(newSelectedUser)
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="30px" display="flex" justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Group Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box display="flex" flexWrap="wrap" w="full">
              {selectedUsers.length > 0 &&
                selectedUsers.map((user: IUser) => (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleDelete={() => handleDelete(user)}
                  />
                ))}
            </Box>
            {loading && <p>Loading users...</p>}
            {searchResults.length > 0 &&
              searchResults.map((user: IUser) => (
                <UserListItem
                  user={user}
                  key={user._id}
                  operation={() => selectUser(user)}
                />
              ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Start Chatting
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal
