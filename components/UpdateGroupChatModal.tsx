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
  FormControl,
  Input,
} from '@chakra-ui/react'

import React, { useContext, useEffect, useState } from 'react'
import {
  addUsersToGroup,
  leaveTheGroup,
  removeUserFromGrp,
  renameGroup,
} from '../apiFunctions/groupChat'
import { searchUsers } from '../apiFunctions/searchUsers'
import { ChatContext, IUser } from '../Context/ChatProvider'
import { useCustomToast } from '../hooks/useCustomToast'
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

  const { showToast } = useCustomToast()

  useEffect(() => {
    setGroupName(selectedChat.chatName)
  }, [selectedChat])

  const handleRename = async () => {
    if (groupName === '') {
      showToast('Group name cannot be empty', 'error')
      return
    }

    try {
      setRenameLoading(true)

      const { data } = await renameGroup(user?.token as string, {
        chatId: selectedChat._id,
        groupName,
      })
      setSelectedChat(data)
      setChats([data])
      setRenameLoading(false)
    } catch (e: any) {
      showToast(e.response.data, 'error')
      console.log(e)
      setRenameLoading(false)
    }
  }

  const showSearchResults = async (value: string) => {
    setSearchKeyword(value)
    setSearchLoading(true)
    try {
      const { data } = await searchUsers(user?.token as string, searchKeyword)
      setSearchResults(data)
      setSearchLoading(false)
    } catch (e: any) {
      console.log(e)
      showToast(e.response.data, 'error')
      setSearchLoading(false)
    }
  }

  const addUsers = async (userToAdd: IUser) => {
    if (selectedChat.groupAdmin._id !== user?._id) {
      showToast('Only admins can add or remove users', 'error')
      return
    }
    if (selectedChat.users.find((u: IUser) => u._id === userToAdd._id)) {
      showToast('User already added in group', 'error')
      return
    }

    try {
      const { data } = await addUsersToGroup(user?.token as string, {
        chatId: selectedChat._id,
        userId: userToAdd._id,
      })
      setSelectedChat(data)
    } catch (e) {
      console.log(e)
    }
  }

  const removeUserFromGroup = async (userToRemove: IUser) => {
    if (selectedChat.groupAdmin._id !== user?._id) {
      showToast('Only admins can add or remove users', 'error')
      return
    }

    try {
      const { data } = await removeUserFromGrp(user?.token as string, {
        chatId: selectedChat._id,
        userId: userToRemove._id,
      })
      showToast(data, 'success')
      setSelectedChat(data)
    } catch (e: any) {
      console.log(e)
      showToast(e.response.data, 'error')
    }
  }

  const leaveGroup = async (userId: string | any) => {
    if (userId !== user?._id) {
      return
    }
    try {
      const { data } = await leaveTheGroup(user?.token as string, {
        chatId: selectedChat._id,
        userId: user?._id as string,
      })
      showToast(data, 'success')
      setSelectedChat(null)
      refreshChats((prevState: boolean) => !prevState)
    } catch (e: any) {
      console.log(e)
      showToast(e.response.data, 'error')
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
