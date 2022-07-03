import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

export interface IUser {
  name: string
  email: string
  token: string
  pic: string
}

export interface userContextInterface {
  user: IUser | null
  isLoggedIn: boolean
  login: (_: IUser) => void
  logOut: () => void
}

const intialContext: userContextInterface = {
  user: null,
  isLoggedIn: false,
  login: (_: IUser) => null,
  logOut: () => null,
}

export const ChatContext = createContext<userContextInterface>(intialContext)

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const loginUser = (userInfo: IUser) => {
    setUser(userInfo)
    setIsLoggedIn(true)
    localStorage.setItem('chatUserInfo', JSON.stringify(userInfo))
  }

  const logOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('chatUserInfo')
    setUser(null)
    console.log('logging out')
  }

  useEffect(() => {
    const user = localStorage.getItem('chatUserInfo')
    let userInfo: IUser | null = null
    if (user) userInfo = JSON.parse(localStorage.getItem('chatUserInfo') || '')
    setUser(userInfo)
    setIsLoggedIn(true)
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [router])

  return (
    <ChatContext.Provider
      value={{
        user,
        isLoggedIn,
        login: loginUser,
        logOut: logOut,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
