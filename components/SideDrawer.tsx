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
  Spinner,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { createChat } from '../apiFunctions/createChat'
import { searchUsers } from '../apiFunctions/searchUsers'
import { ChatContext, IUser } from '../Context/ChatProvider'
import { useCustomToast } from '../hooks/useCustomToast'
import ProfileModal from './ProfileModal'
import SearchLoading from './SearchLoading'
import UserListItem from './UserListItem'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { showToast } = useCustomToast()

  const userCtx = useContext(ChatContext)

  const { user, logOut, setSelectedChat } = userCtx

  const handleSearch = async () => {
    if (search === '') {
      showToast('Search field is empty', 'error')
      return
    }
    try {
      setLoading(true)
      const { data } = await searchUsers(user?.token as string, search)
      setLoading(false)
      setSearchResult(data)
    } catch (e) {
      console.log(e)
      showToast('Something went wrong', 'error')
    }
  }

  const openChat = async (userId: string) => {
    try {
      setLoadingChat(true)
      const { data } = await createChat(user?.token as string, { userId })
      setLoadingChat(false)
      setSelectedChat(data)
      onClose()
    } catch (e) {
      console.log(e)
      showToast('Something went wrong while setting up chat', 'error')
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
              <MenuItem
                onClick={() => {
                  logOut()
                  setSelectedChat(null)
                }}
              >
                Log out
              </MenuItem>
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
                    operation={() => {
                      openChat(user._id)
                    }}
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
