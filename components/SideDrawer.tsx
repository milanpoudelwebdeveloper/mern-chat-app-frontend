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
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { ChatContext } from '../Context/ChatProvider'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)

  console.log(search, searchResult, loading, loadingChat)

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
              <MenuList>
                <MenuItem>My Profile</MenuItem>
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </MenuList>
            </MenuButton>
          </Menu>
        </Box>
      </Box>
    </>
  )
}

export default SideDrawer
