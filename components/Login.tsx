import React, { useContext, useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'

import { login as logIn } from '../apiFunctions/login'
import { useRouter } from 'next/router'
import { ChatContext } from '../Context/ChatProvider'
import { useCustomToast } from '../hooks/useCustomToast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { login } = useContext(ChatContext)

  const { showToast } = useCustomToast()

  const loginHandler = async () => {
    setLoading(true)
    if (!email || !password) {
      showToast('Please enter your email and password', 'warning')
      setLoading(false)
      return
    }
    const loginInfo = {
      email,
      password,
    }
    try {
      const { data } = await logIn(loginInfo)
      showToast('Log in successfully', 'success')
      localStorage.setItem('chatUserInfo', JSON.stringify(data))
      setLoading(false)
      login(data)
      router.push('/chats')
    } catch (e: any) {
      console.log(e)
      showToast(e.response.data, 'error')
      setLoading(false)
    }
  }
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement w="4.5rem">
            <Button
              size="sm"
              height="1.75rem"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        w="full"
        mt="15px"
        onClick={() => loginHandler()}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        w="full"
        mt="15px"
        disabled={loading}
        onClick={() => {
          setEmail('guest@example.com')
          setPassword('123456')
        }}
      >
        Login as Guest
      </Button>
    </VStack>
  )
}

export default Login
