import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatProvider'
import SingleChat from './SingleChat'

const ChatBox = () => {
  const { selectedChat } = useContext(ChatContext)
  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      w={{ base: 'full', md: '68%' }}
      alignItems="center"
      flexDirection="column"
      p={3}
      borderRadius="lg"
      borderWidth="1px"
      bg="white"
    >
      <SingleChat />
    </Box>
  )
}

export default ChatBox
