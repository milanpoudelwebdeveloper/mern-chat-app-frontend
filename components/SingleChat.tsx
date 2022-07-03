import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatProvider'

const SingleChat = () => {
  const { selectedChat, setSelectedChat } = useContext(ChatContext)
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
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="chat"
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />
          </Text>
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
