import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react'

import React, { useContext, useEffect, useState } from 'react'
import { fetchMessages } from '../apiFunctions/getMessages'
import { sendSingleMessage } from '../apiFunctions/sendMessage'
import { ChatContext, IUser } from '../Context/ChatProvider'
import { useCustomToast } from '../hooks/useCustomToast'
import { getSender, getUserFullInfo } from '../utils/getSender'
import ProfileModal from './ProfileModal'
import ScrollableChat from './ScrollableChat'
import UpdateGroupChatModal from './UpdateGroupChatModal'

const SingleChat = () => {
  const { selectedChat, setSelectedChat, user } = useContext(ChatContext)

  const senderName =
    selectedChat && getSender(user as IUser, selectedChat.users)

  const senderFullInfo =
    selectedChat && getUserFullInfo(user as IUser, selectedChat.users)

  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  const { showToast } = useCustomToast()

  useEffect(() => {
    fetchAllMessages()
  }, [selectedChat])

  const fetchAllMessages = async () => {
    if (!selectedChat) return
    try {
      setLoading(true)
      const { data } = await fetchMessages(
        user?.token as string,
        selectedChat._id
      )
      setMessages(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      showToast('Somthing went wrong while fetching messages', 'error')
      setLoading(false)
    }
  }

  const sendMessage = async (event: any) => {
    if (event.key === 'Enter' && newMessage !== '') {
      try {
        const { data } = await sendSingleMessage(user?.token as string, {
          chatId: selectedChat && selectedChat._id,
          content: newMessage,
        })
        setNewMessage('')
        setMessages([...messages, data])
      } catch (e: any) {
        console.log(e)
        showToast(e.response.data, 'error')
      }
    }
  }

  const typingHandler = (message: string) => {
    setNewMessage(message)
  }

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="full"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
            color="black"
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="chat"
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />
            {selectedChat && !selectedChat.isGroupChat ? (
              <>
                {senderName}
                <ProfileModal user={senderFullInfo} />
              </>
            ) : (
              <>
                {/* if it is a group chat show the group chat name */}
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="#E8E8E8"
            justifyContent="flex-end"
            w="full"
            h="full"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading && (
              <Spinner
                size="xl"
                w={20}
                h={20}
                margin="auto"
                alignSelf="center"
              />
            )}
            {messages.length >= 0 && (
              <Box
                display="flex"
                flexDir="column"
                overflowY="scroll"
                style={{ scrollbarWidth: 'none' }}
              >
                <ScrollableChat messages={messages} />
              </Box>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                bg="#E0E0E0"
                variant="filled"
                placeholder="Type a message"
                onChange={(e: any) => typingHandler(e.target.value)}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          height="full"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="3xl" pb={3}>
            Click on any user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat
