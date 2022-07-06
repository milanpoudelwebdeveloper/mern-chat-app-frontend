import { ViewIcon } from '@chakra-ui/icons'
import {
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  IconButton,
  useToast,
  FormControl,
  Input,
} from '@chakra-ui/react'
import axios from 'axios'

import React, { useContext, useEffect, useState } from 'react'
import { ChatContext, IUser } from '../Context/ChatProvider'
import SearchLoading from './SearchLoading'
import UserBadgeItem from './UserBadgeItem'
import UserListItem from './UserListItem'

const UpdateGroupChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { selectedChat, setSelectedChat, user, setChats, refreshChats } =
    useContext(ChatContext)
  const [groupName, setGroupName] = useState(selectedChat.chatName)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)

  const [searchResults, setSearchResults] = useState<IUser[]>([])

  const toast = useToast()

  useEffect(() => {
    setGroupName(selectedChat.chatName)
  }, [selectedChat])

  const handleRename = async () => {
    if (groupName === '') {
      toast({
        title: 'Group name cannot be empty',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    try {
      console.log('puttomng')
      setRenameLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      }
      console.log('hey')
      const { data } = await axios.put(
        'http://localhost:8000/api/chatGroup/rename',
        {
          chatId: selectedChat._id,
          groupName,
        },
        config
      )
      setSelectedChat(data)
      setChats([data])
      setRenameLoading(false)
    } catch (e: any) {
      console.log(e)
      toast({
        title: e.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      console.log(e)
      setRenameLoading(false)
    }
  }

  const showSearchResults = async (value: string) => {
    setSearchKeyword(value)
    setSearchLoading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      }
      const { data } = await axios.get(
        'http://localhost:8000/api/allusers?keyword=' + searchKeyword,
        config
      )
      setSearchResults(data)
      setSearchLoading(false)
    } catch (e: any) {
      console.log(e)
      toast({
        title: e.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setSearchLoading(false)
    }
  }

  const addUsers = async (userToAdd: IUser) => {
    if (selectedChat.groupAdmin._id !== user?._id) {
      toast({
        title: 'Only admins can add or remove users',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    }
    if (selectedChat.users.find((u: IUser) => u._id === userToAdd._id)) {
      toast({
        title: 'User already added in group',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      }
      const { data } = await axios.put(
        'http://localhost:8000/api/chatGroup/addusers',
        { chatId: selectedChat._id, userId: userToAdd._id },
        config
      )
      setSelectedChat(data)
    } catch (e) {
      console.log(e)
    }
  }

  const removeUserFromGroup = async (userToRemove: IUser) => {
    if (selectedChat.groupAdmin._id !== user?._id) {
      toast({
        title: 'Only admins can add or remove users',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      }
      const { data } = await axios.put(
        'http://localhost:8000/api//chatGroup/removeUsers',
        { chatId: selectedChat._id, userId: userToRemove._id },
        config
      )
      toast({
        title: data,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setSelectedChat(data)
    } catch (e: any) {
      console.log(e)
      toast({
        title: e.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const leaveGroup = async (userId: string | any) => {
    if (userId !== user?._id) {
      return
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user && user.token}`,
      },
    }
    try {
      const { data } = await axios.put(
        'http://localhost:8000/api/chatGroup/leaveGroup',
        {
          chatId: selectedChat._id,
          userId: user?._id,
        },
        config
      )
      toast({
        title: data,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setSelectedChat(null)
      refreshChats((prevState: boolean) => !prevState)
    } catch (e: any) {
      console.log(e)
      toast({
        title: e.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <>
      <IconButton
        display={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={onOpen}
        aria-label="view"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexWrap="wrap" w="full" pb={3}>
              {selectedChat.users.map((user: IUser) => (
                <UserBadgeItem
                  handleDelete={() => removeUserFromGroup(user)}
                  user={user}
                  key={user._id}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Group Name"
                mb={3}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button
                variant="solid"
                bg="teal"
                color="white"
                ml={1}
                isLoading={renameLoading}
                onClick={() => handleRename()}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to Group"
                value={searchKeyword}
                onChange={(e: any) => {
                  showSearchResults(e.target.value)
                }}
              />
            </FormControl>
            {searchLoading && <SearchLoading />}
            {searchResults.length > 0 &&
              searchResults.map((result: IUser) => (
                <UserListItem
                  user={result}
                  operation={() => addUsers(result)}
                  key={result._id}
                />
              ))}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => leaveGroup(user?._id)}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
