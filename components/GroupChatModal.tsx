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
  FormControl,
  Input,
  Box,
} from '@chakra-ui/react'

import React, { ReactNode, useContext, useState } from 'react'
import { createGroupChat } from '../apiFunctions/groupChat'
import { searchUsers } from '../apiFunctions/searchUsers'
import { ChatContext, IUser } from '../Context/ChatProvider'
import { useCustomToast } from '../hooks/useCustomToast'
import UserBadgeItem from './UserBadgeItem'
import UserListItem from './UserListItem'

const GroupChatModal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<any>([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const { showToast } = useCustomToast()
  const { user, setChats } = useContext(ChatContext)

  const handleSearch = async (value: string) => {
    setSearch(value)
    if (!value) {
      return
    } else {
      try {
        setLoading(true)
        const { data } = await searchUsers(user?.token as string, search)
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
      showToast(
        'Please enter a group chat name and select at least 2 users',
        'warning'
      )
      return
    }
    try {
      const groupData = {
        groupName: groupChatName,
        //we are going to stringify and send the users id by filteting them
        users: JSON.stringify(selectedUsers.map((user: IUser) => user._id)),
      }
      const { data } = await createGroupChat(user?.token as string, groupData)
      onClose()
      //here data is an single object but in context provider, we need to pass array that's why we do this
      setChats((prevData: any) => [data, ...prevData])
      showToast('Group chat created successfully', 'success')
    } catch (e) {
      console.log(e)
      showToast('Group chat creation failed', 'error')
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
      showToast('User already added', 'warning')
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
