import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ChatContext, IUser } from '../Context/ChatProvider'
import { getSender, getUserFullInfo } from '../utils/getSender'
import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'

const SingleChat = () => {
  const { selectedChat, setSelectedChat, user } = useContext(ChatContext)
  console.log('hey selected chat is', selectedChat)

  const senderName =
    selectedChat && getSender(user as IUser, selectedChat.users)

  const senderFullInfo =
    selectedChat && getUserFullInfo(user as IUser, selectedChat.users)
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
            Messages here
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
