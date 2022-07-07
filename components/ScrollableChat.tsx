import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatContext } from '../Context/ChatProvider'

const ScrollableChat: React.FC<{ messages: any[] }> = ({ messages }) => {
  const { user } = useContext(ChatContext)

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => {
          if (message.sender._id === user?._id) {
            return (
              <Box key={index} bg="blue" textAlign="left">
                {message.content}
              </Box>
            )
          } else {
            return (
              <Box key={index} bg="red" textAlign="right">
                {message.content}
              </Box>
            )
          }
        })}
    </ScrollableFeed>
  )
}

export default ScrollableChat
