import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import ChatBox from '../components/ChatBox'
import MyChats from '../components/MyChats'
import SideDrawer from '../components/SideDrawer'
import { ChatContext } from '../Context/ChatProvider'

const Chats: NextPage = () => {
  const userCtx = useContext(ChatContext)
  const { user, isLoggedIn } = userCtx

  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn])

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
