import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { IUser } from '../Context/ChatProvider'

interface props {
  user: IUser
  handleDelete: () => void
}

const UserBadgeItem: React.FC<props> = ({ user, handleDelete }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      fontSize="12px"
      bg="purple"
      cursor="pointer"
      color="white"
      onClick={handleDelete}
    >
      {user.name}
      <CloseIcon onClick={handleDelete} pl={1} />
    </Box>
  )
}

export default UserBadgeItem
