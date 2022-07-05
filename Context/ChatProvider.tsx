import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

export interface IUser {
  name: string
  email: string
  token: string
  pic: string
  _id: string
  chats: any
}

export interface userContextInterface {
  user: IUser | null
  login: (_: IUser) => void
  logOut: () => void
  selectedChat: any
  setSelectedChat: (_: any) => void
  chats: []
  setChats: (_: any) => void
}

const intialContext: userContextInterface = {
  user: null,
  login: (_: IUser) => null,
  logOut: () => null,
  selectedChat: {},
  setSelectedChat: (_: any) => null,
  chats: [],
  setChats: (_: any) => null,
}

export const ChatContext = createContext<userContextInterface>(intialContext)

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [selectedChat, setSelectedChat] = useState<any>(undefined)
  const [chats, setChats] = useState<any>([])
  const router = useRouter()

  const loginUser = (userInfo: IUser) => {
    setUser(userInfo)
    localStorage.setItem('chatUserInfo', JSON.stringify(userInfo))
  }

  const logOut = () => {
    localStorage.removeItem('chatUserInfo')
    setUser(null)
    router.push('/')
  }

  const addToChats = (chatData: any) => {
    setChats((prevData: any) => [...chatData, ...prevData])
  }

  console.log('check your chat datas in the context api', chats)

  useEffect(() => {
    const storedUser = localStorage.getItem('chatUserInfo')
    let userInfo: IUser | null = null
    if (storedUser) {
      userInfo = JSON.parse(localStorage.getItem('chatUserInfo') || '')
      setUser(userInfo)
    } else {
      router.push('/')
    }
  }, [router.isReady])

  return (
    <ChatContext.Provider
      value={{
        user,
        login: loginUser,
        logOut: logOut,
        selectedChat,
        setSelectedChat,
        chats,
        setChats: addToChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
