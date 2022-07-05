import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useContext } from 'react'
import ChatBox from '../components/ChatBox'
import MyChats from '../components/MyChats'
import SideDrawer from '../components/SideDrawer'
import { ChatContext } from '../Context/ChatProvider'

const Chats: NextPage = () => {
  const userCtx = useContext(ChatContext)
  const { user } = userCtx
  return (
    <Box w="full">
      {user && <SideDrawer />}
      <Box
        display="flex"
        w="full"
        justifyContent="space-between"
        h="91vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </Box>
  )
}

export default Chats
