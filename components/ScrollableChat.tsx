import { Box } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat: React.FC<{ messages: any[] }> = ({ messages }) => {
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Box display="flex" key={i}>
            {m.content}
          </Box>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
