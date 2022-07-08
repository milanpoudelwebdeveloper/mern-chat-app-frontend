import { Avatar, Box, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatContext, IUser } from '../Context/ChatProvider'
import { isLastMessage, isSameSender } from '../utils/chat'

const ScrollableChat: React.FC<{ messages: any[] }> = ({ messages }) => {
  const { user } = useContext(ChatContext)

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => {
          console.log(
            'statement is true?',
            isSameSender(messages, index, user as IUser) ||
              (isLastMessage(messages, index, user as IUser) && 'milan')
          )

          console.log(
            'is same sender',
            isSameSender(messages, index, user as IUser)
          )

          console.log(
            'is last message',
            isLastMessage(messages, index, user as IUser)
          )

          return (
            <Box display="flex" key={index} alignItems="end">
              {isSameSender(messages, index, user as IUser) ||
                (isLastMessage(messages, index, user as IUser) && (
                  <Avatar
                    mt={2}
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={message.sender.name}
                    src={message.sender.pic}
                  />
                ))}
              <Flex
                w="full"
                justify={
                  message.sender._id === user?._id ? 'flex-end' : 'flex-start'
                }
              >
                <Box
                  borderRadius="20px"
                  padding="5px 15px"
                  backgroundColor={
                    message.sender._id === user?._id ? '#BEE3F8' : '#B9F5D0'
                  }
                  ml={
                    message.sender._id === user?._id
                      ? '0'
                      : isSameSender(messages, index, user as IUser)
                      ? '8'
                      : '0'
                  }
                  mt={2}
                >
                  {message.content}
                </Box>
              </Flex>
            </Box>
          )
        })}
    </ScrollableFeed>
  )
}

export default ScrollableChat
