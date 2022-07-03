import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { useRouter } from 'next/router'
import { ChatContext } from '../Context/ChatProvider'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [pic, setPic] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const { login } = useContext(ChatContext)

  const postPic = async (file: any) => {
    console.log('file is', file)
    setLoading(true)
    if (!file) {
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      Resizer.imageFileResizer(file, 720, 720, 'JPEG', 100, 0, async (uri) => {
        try {
          const response = await axios.post(
            'http://localhost:8000/api/uploadImage',
            {
              image: uri,
            }
          )
          setPic(response.data.url)
          setLoading(false)
        } catch (e) {
          setLoading(false)
          console.log('File upload failed', e)
        }
      })
    } else {
      toast({
        title: 'Please select an appropriate image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return
    }
  }

  const submitHandler = async () => {
    setLoading(true)
    if (name === '' || email === '' || password === '') {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
      return
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
      return
    }
    const userData = {
      name,
      email,
      password,
      pic,
    }
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/register',
        userData
      )
      if (data) {
        localStorage.setItem('chatUserInfo', JSON.stringify(data))
        login(data)
        router.push('/chats')
      }
      setLoading(false)
    } catch (e: any) {
      toast({
        title: e.response.data,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
    }
  }
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>
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
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password again"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
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
      <FormControl id="pic">
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e: any) => postPic(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        w="full"
        mt="15px"
        onClick={submitHandler}
        isLoading={loading}
        disabled={loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp
