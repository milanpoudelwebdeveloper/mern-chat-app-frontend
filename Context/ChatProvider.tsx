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
  login: (_: IUser) => void
  logOut: () => void
}

const intialContext: userContextInterface = {
  user: null,
  login: (_: IUser) => null,
  logOut: () => null,
}

export const ChatContext = createContext<userContextInterface>(intialContext)

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
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

  console.log('Chat provider is running')

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
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
