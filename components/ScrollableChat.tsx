import { Box } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat: React.FC<{ messages: [] }> = ({ messages }) => {
  return (
    <ScrollableFeed>
      {messages && messages.map((m, i) => <Box display="flex" key={i}></Box>)}
    </ScrollableFeed>
  )
}

export default ScrollableChat
