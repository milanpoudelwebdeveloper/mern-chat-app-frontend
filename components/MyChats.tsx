import React, { useContext, useEffect } from 'react'
import { ChatContext, IUser } from '../Context/ChatProvider'
import { Box, Button, Stack, useToast, Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { getSender } from '../utils/getSender'
import GroupChatModal from './GroupChatModal'
import { fetchChats } from '../apiFunctions/fetchChats'
const MyChats = () => {
  const userCtx = useContext(ChatContext)
  const { user, selectedChat, setSelectedChat, chats, setChats, chatStatus } =
    userCtx
  const toast = useToast()

  useEffect(() => {
    if (!user) {
      return
    }
    fetchAllChats()
  }, [user, chatStatus])

  const fetchAllChats = async () => {
    try {
      const { data } = await fetchChats(user?.token as string)
      console.log('data from api', data)
      setChats(data)
    } catch (e) {
      console.log(e)
      toast({
        title: 'Something went wrong while fetching chats',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-left',
      })
    }
  }

  console.log('chats after fetching', chats)

  //we want to display only chat box in mobile version to make it responsive when users click on any results
  //to start chat
  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      borderRadius="lg"
      w={{ base: 'full', md: '31%' }}
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        display="flex"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="F8F8F8"
        w="full"
        height="full"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats.length > 0 && (
          <Stack overflow="scroll">
            {chats.map((chat: any, index) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius="lg"
                key={index}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user as IUser, chat && chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default MyChats
