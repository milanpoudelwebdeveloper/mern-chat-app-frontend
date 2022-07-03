import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  Input,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ChatContext, IUser } from '../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import SearchLoading from './SearchLoading'
import UserListItem from './UserListItem'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  console.log(searchResult)

  const userCtx = useContext(ChatContext)

  const { user, logOut, setSelectedChat } = userCtx

  const handleSearch = async () => {
    if (search === '') {
      toast({
        title: 'Search field is empty',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-left',
      })
      return
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      }
      const { data } = await axios.get(
        `http://localhost:8000/api/allusers?keyword=${search}`,
        config
      )
      setLoading(false)
      setSearchResult(data)
    } catch (e) {
      console.log(e)
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-left',
      })
    }
  }

  const openChat = async (userId: string) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      }
      const { data } = await axios.post(
        `http://localhost:8000/api/chat`,
        { userId },
        config
      )
      setLoadingChat(false)
      setSelectedChat(data)
      onClose()
    } catch (e) {
      console.log(e)
      toast({
        title: 'Something went wrong while setting up chat',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-left',
      })
      setLoadingChat(false)
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        w="full"
        bg="white"
        borderWidth={'5px'}
        padding="5px 10px 5px 10px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <SearchIcon />
            <Text display={{ base: 'none', md: 'flex' }} p="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">Talk-A-Tive</Text>
        <Box>
          <Menu>
            <MenuButton p={1} alignItems="center">
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user?.name} />
            </MenuButton>

            <MenuList>
              <ProfileModal user={user as IUser}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={() => logOut()}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search Users</DrawerHeader>

            <DrawerBody>
              <Box display="flex" pb="2">
                <Input
                  placeholder="Type here..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  mr={2}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading && <SearchLoading />}
              {searchResult.length > 0 &&
                searchResult.map((user: any) => (
                  <UserListItem
                    user={user}
                    openChat={() => openChat(user._id)}
                    key={user._id}
                  />
                ))}
              {loadingChat && <Spinner ml="auto" display="flex" />}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  )
}

export default SideDrawer
