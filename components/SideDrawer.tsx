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
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { ChatContext, IUser } from '../Context/ChatProvider'
import ProfileModal from './ProfileModal'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)

  console.log(search, searchResult, loadingChat, loading)

  console.log(setSearch, setSearchResult, setLoading, setLoadingChat)

  const userCtx = useContext(ChatContext)

  const { user, logOut } = userCtx

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
          <Button variant="ghost">
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
      </Box>
    </>
  )
}

export default SideDrawer
