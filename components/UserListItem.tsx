import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { IUser } from '../Context/ChatProvider'

interface props {
  user: IUser
  operation: () => void
}

const UserListItem: React.FC<props> = ({ user, operation }) => {
  const { name, email, pic } = user
  return (
    <Box
      onClick={operation}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{ background: '#38B2AC' }}
      w="full"
      display={'flex'}
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={name} src={pic} />
      <Box>
        <Text>{name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {email}
        </Text>
      </Box>
    </Box>
  )
}

export default UserListItem
