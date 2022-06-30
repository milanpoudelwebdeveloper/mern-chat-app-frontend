import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const loginHandler = () => {}
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

      <Button colorScheme="blue" w="full" mt="15px" onClick={loginHandler}>
        Login
      </Button>
      <Button
        colorScheme="red"
        w="full"
        mt="15px"
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
